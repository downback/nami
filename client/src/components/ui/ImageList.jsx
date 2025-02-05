import React, { useEffect, useState } from "react"
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebase-config"
import styles from "./ImageList.module.css"
import DetailView from "./DetailView"

const ImageList = ({ folderName, title, isCaption }) => {
  const [images, setImages] = useState([])
  const [captions, setCaptions] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderOpen, setSliderOpen] = useState(false)

  useEffect(() => {
    const fetchImagesAndCaptions = async () => {
      try {
        const storage = getStorage()
        const listRef = ref(storage, folderName)
        const response = await listAll(listRef)

        const urls = await Promise.all(
          response.items.map(async (item) => {
            const url = await getDownloadURL(item)
            return { name: item.name, url }
          })
        )

        setImages(urls)

        const captionsCollection = collection(db, "galleryCaptions")
        const captionsSnapshot = await getDocs(captionsCollection)
        const captionsData = {}
        captionsSnapshot.forEach((doc) => {
          captionsData[doc.id] = doc.data().caption
        })

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
      <div className={styles.title}>{title}</div>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
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
