import React, { useState, useEffect } from "react"
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage"
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore"
import styles from "./AdminForm.module.css"
import WhiteWrapper from "../ui/WhiteWrapper"

const AdminForm = ({ folderName, title, isCaption }) => {
  const db = getFirestore()
  const [images, setImages] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [captions, setCaptions] = useState({})
  const [newCaption, setNewCaption] = useState("")

  useEffect(() => {
    const fetchImagesAndCaptions = async () => {
      const storage = getStorage()
      const listRef = ref(storage, `${folderName}/`)
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
    }

    fetchImagesAndCaptions()
  }, [folderName])

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

      if (newCaption) {
        const captionRef = doc(db, "galleryCaptions", file.name)
        await setDoc(captionRef, { caption: newCaption })
      }

      alert("Image and caption uploaded successfully!")
      setFile(null)
      setNewCaption("")
      window.location.reload()
    } catch (error) {
      alert("Error uploading image: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (imageUrl) => {
    const storage = getStorage()
    const imageName = imageUrl.split("%2F")[1].split("?")[0]
    const imageRef = ref(storage, `${folderName}/${imageName}`)

    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteObject(imageRef)

        await deleteDoc(doc(db, "galleryCaptions", imageName))

        alert("Image and caption deleted successfully!")
        setImages(images.filter((img) => img.url !== imageUrl))
      } catch (error) {
        alert("Error deleting image: " + error.message)
      }
    }
  }

  return (
    <WhiteWrapper to="/admin">
      <div className={styles.container}>
        <div className={styles.title}>
          MANAGE
          <span className={styles.titleStrong}>{title}</span>
          IMAGES
        </div>

        <section className={styles.uploadSection}>
          <h2 className={styles.sectionTitle}>Upload New Image</h2>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          {isCaption && (
            <input
              type="text"
              placeholder="Enter caption here..."
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className={styles.captionInput}
            />
          )}
          <button
            onClick={uploadImage}
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </section>

        <section className={styles.gallerySection}>
          <h2 className={styles.sectionTitle}>Here Are Uploaded Images!</h2>
          {images.length === 0 ? (
            <p>No images found.</p>
          ) : (
            <div className={styles.imageGrid}>
              {images.map((image, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img
                    src={image.url}
                    alt={`${folderName} Image${index + 1}`}
                    className={styles.image}
                  />
                  {isCaption && (
                    <div className={styles.captionContainer}>
                      <div className={styles.captionTitle}>
                        {folderName} image{index + 1} caption text:
                      </div>
                      {captions[image.name] ? (
                        <div>{captions[image.name]}</div>
                      ) : (
                        <div className={styles.noCaption}>none</div>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => deleteImage(image.url)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </WhiteWrapper>
  )
}

export default AdminForm
