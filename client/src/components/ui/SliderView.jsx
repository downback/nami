import React, { useEffect, useState } from "react"
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import styles from "./SliderView.module.css"

import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const SliderView = ({ folderName }) => {
  const [images, setImages] = useState([])
  const [sliderOpen, setSliderOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage()
        const listRef = ref(storage, folderName) // Folder name passed as a parameter
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

  const closeSlider = () => setSliderOpen(false)

  const sliderSettings = {
    initialSlide: currentIndex,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex),

    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 100,
    arrows: true,
    prevArrow: <FaArrowLeft className={styles.arrow} />,
    nextArrow: <FaArrowRight className={styles.arrow} />,
  }

  return (
    <div className={styles.container}>
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
        <div className={styles.sliderOverlay}>
          <button className={styles.closeButton} onClick={closeSlider}>
            &times;
          </button>
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className={styles.sliderImageWrapper}>
                <img
                  src={image}
                  alt={`Slider item ${index + 1}`}
                  className={styles.sliderImage}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default SliderView
