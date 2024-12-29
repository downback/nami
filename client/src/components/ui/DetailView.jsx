import React, { useEffect, useState } from "react"
import styles from "./DetailView.module.css"
import { IoCloseOutline } from "react-icons/io5"
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundDown,
  IoIosArrowRoundForward,
  IoIosArrowRoundUp,
} from "react-icons/io"

const DetailView = ({ images, currentIndex, onClose, onIndexChange }) => {
  const [displayedImages, setDisplayedImages] = useState([])
  const [nextImageAnimation, setNextImageAnimation] = useState(false)
  const [prevImageAnimation, setPrevImageAnimation] = useState(false)
  //   const [isLoaded, setIsLoaded] = useState(false)
  //   const [preloadedImages, setPreloadedImages] = useState([])

  useEffect(() => {
    const initializeImages = () => {
      const newDisplayedImages = []
      for (let i = currentIndex - 2; i <= currentIndex + 2; i++) {
        if (i >= 0 && i < images.length) {
          newDisplayedImages.push(images[i])
        } else {
          newDisplayedImages.push(null)
        }
      }
      setDisplayedImages(newDisplayedImages)
    }

    initializeImages()
  }, [currentIndex, images])

  //   useEffect(() => {
  //     const preloadImages = async () => {
  //       const loadedImages = await Promise.all(
  //         images.map((src) => {
  //           return new Promise((resolve) => {
  //             const img = new Image()
  //             img.src = src
  //             img.onload = () => resolve(src)
  //             img.onerror = () => resolve(null)
  //           })
  //         })
  //       )
  //       setPreloadedImages(loadedImages.filter(Boolean)) // Filter out failed loads
  //       setIsLoaded(true) // Mark as loaded
  //     }

  //     preloadImages()
  //   }, [images])

  const handlePrev = () => {
    if (currentIndex > 0) {
      setPrevImageAnimation(true)

      setTimeout(() => {
        onIndexChange(currentIndex - 1)
      }, 200)

      setTimeout(() => {
        setPrevImageAnimation(false)
      }, 1000)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setNextImageAnimation(true)
      setTimeout(() => {
        onIndexChange(currentIndex + 1)
      }, 200)

      setTimeout(() => {
        setNextImageAnimation(false)
      }, 1000)
    }
  }

  const handleImageClick = (indexOffset) => {
    const newIndex = currentIndex + indexOffset
    if (newIndex >= 0 && newIndex < images.length) {
      onIndexChange(newIndex)
    }
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.sliderOverlay} onClick={onClose}></div>
      <button className={styles.closeButton} onClick={onClose}>
        <IoCloseOutline />
      </button>
      <button
        className={`${styles.arrowButtonBack} ${
          currentIndex <= 0 ? styles.disabled : ""
        }`}
        onClick={handlePrev}
      >
        <IoIosArrowRoundBack />
      </button>
      <button
        className={`${styles.arrowButtonForward} ${
          currentIndex >= images.length - 1 ? styles.disabled : ""
        }`}
        onClick={handleNext}
      >
        <IoIosArrowRoundForward />
      </button>

      <div className={styles.sliderContainer}>
        <div className={styles.imageCardContainer}>
          {displayedImages.map((image, offset) => (
            <div
              key={offset}
              className={`${styles.sliderImageWrapper} ${
                prevImageAnimation && styles.prev
              } ${nextImageAnimation && styles.next} `}
              onClick={() => handleImageClick(offset - 2)}
            >
              {image ? (
                <img
                  src={image}
                  alt={`Image ${currentIndex + offset - 2}`}
                  className={styles.image}
                />
              ) : (
                <div className={styles.placeholder}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailView
