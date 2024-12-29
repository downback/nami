import React, { useEffect, useState } from "react"
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"
import styles from "./ImageList.module.css"
import DetailView from "./DetailView"

const ImageList = ({ folderName, title }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderOpen, setSliderOpen] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage()
        const listRef = ref(storage, folderName)
        const response = await listAll(listRef)
        const urls = await Promise.all(
          response.items.map((item) => getDownloadURL(item))
        )
        setImages(urls)
      } catch (error) {
        console.error("Error fetching images:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
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
        <p className={styles.loading}>Loading images...</p>
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
                src={image}
                alt={`Gallery item ${index + 1}`}
                className={styles.image}
              />
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
