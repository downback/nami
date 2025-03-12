import React, { useEffect, useState } from "react"
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebase-config"
import DetailView from "./DetailView"
import { useNavigate } from "react-router-dom"
import { SlArrowLeft } from "react-icons/sl"
import { IoIosArrowRoundUp } from "react-icons/io"

import styles from "./ImageList.module.css"

const ImageList = ({ folderName, title, isCaption }) => {
  const [images, setImages] = useState([])
  const [captions, setCaptions] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderOpen, setSliderOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchImagesAndCaptions = async () => {
      try {
        const storage = getStorage()
        const listRef = ref(storage, folderName)
        const response = await listAll(listRef)

        // Fetch image URLs and metadata
        const imagesData = await Promise.all(
          response.items.map(async (item) => {
            const url = await getDownloadURL(item)
            const metadata = await getMetadata(item)
            console.log(`Image: ${url}, Metadata:`, metadata)
            return {
              name: item.name,
              url,
              cacheControl: metadata.cacheControl || "Not Set",
            }
          })
        )

        // Preload all images
        const preloadImage = (url) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = reject
            img.src = url
          })
        }
        await Promise.all(imagesData.map((img) => preloadImage(img.url)))

        // Fetch captions and order info from Firestore.
        const captionsCollection = collection(db, "galleryCaptions")
        const captionsSnapshot = await getDocs(captionsCollection)
        const captionsData = {}
        const orders = {} // Mapping of image name -> order value.
        captionsSnapshot.forEach((doc) => {
          const data = doc.data()
          captionsData[doc.id] = data.caption
          // If order is not set, default to a high value so the image goes to the bottom.
          orders[doc.id] = data.order !== undefined ? data.order : 9999
        })

        // Merge order into the images data and sort by order.
        const sortedImages = imagesData
          .map((img) => ({
            ...img,
            order: orders[img.name] !== undefined ? orders[img.name] : 9999,
          }))
          .sort((a, b) => a.order - b.order)

        setImages(sortedImages)
        setCaptions(captionsData)
      } catch (error) {
        console.error("Error fetching images or captions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImagesAndCaptions()
  }, [folderName])

  const openSlider = (index) => {
    setCurrentIndex(index)
    setSliderOpen(true)
  }

  const closeSlider = () => {
    setSliderOpen(false)
  }

  const handleIndexChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.backButtonContainer} onClick={() => navigate("/")}>
        <SlArrowLeft className={styles.backButton} />
      </div>
      <div className={styles.title}>{title}</div>
      {loading ? (
        <p className={styles.loading}>Loading</p>
      ) : images.length === 0 ? (
        <p className={styles.noImages}>No images found.</p>
      ) : (
        <div className={styles.gallery}>
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.imageWrapper}
              onClick={() => openSlider(index)}
            >
              <img
                src={image.url}
                alt={`Gallery item ${index + 1}`}
                className={styles.image}
              />
              {isCaption && (
                <div className={styles.captionText}>
                  {captions[image.name] || ""}
                </div>
              )}
            </div>
          ))}
          <IoIosArrowRoundUp
            className={styles.goTopButton}
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          />
        </div>
      )}
      {sliderOpen && (
        <DetailView
          images={images}
          currentIndex={currentIndex}
          onClose={closeSlider}
          onIndexChange={handleIndexChange}
        />
      )}
    </div>
  )
}

export default ImageList
