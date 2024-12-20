import React, { useState, useEffect } from "react"
import { storage } from "../services/firebase-config"
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage"
import styles from "./AdminForm.module.css"
import { Link } from "react-router-dom"

const AdminForm = ({ folderName, title }) => {
  const [images, setImages] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage()
      const listRef = ref(storage, `${folderName}/`)
      const response = await listAll(listRef)

      const urls = await Promise.all(
        response.items.map((item) => getDownloadURL(item))
      )
      setImages(urls)
    }

    fetchImages()
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const uploadImage = async () => {
    if (!file) {
      alert("Please select a file to upload.")
      return
    }

    setLoading(true)
    const storage = getStorage()
    const storageRef = ref(storage, `${folderName}/${file.name}`)

    try {
      await uploadBytes(storageRef, file)
      alert("Image uploaded successfully!")
      setFile(null)
      window.location.reload() // Refresh to show new image
    } catch (error) {
      alert("Error uploading image: ", error.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete an image
  const deleteImage = async (imageUrl) => {
    const storage = getStorage()
    const imageName = imageUrl.split("%2F")[1].split("?")[0]
    const imageRef = ref(storage, `flash/${imageName}`)

    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteObject(imageRef)
        alert("Image deleted successfully!")
        setImages(images.filter((img) => img !== imageUrl))
      } catch (error) {
        alert("Error deleting image: ", error.message)
      }
    }
  }

  return (
    <div className={styles.container}>
      <Link to="/admin" className={styles.backButton}>
        <button>Go Back to Admin Page</button>
      </Link>
      <h1>{title}</h1>

      <div className={styles.uploadSection}>
        <h2>Upload Image</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <button
          onClick={uploadImage}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className={styles.gallery}>
        <h2>{title} IMAGES</h2>
        {images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <div className={styles.imageGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageWrapper}>
                <img
                  src={image}
                  alt={`flash item ${index + 1}`}
                  className={styles.image}
                />
                <button
                  onClick={() => deleteImage(image)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminForm
