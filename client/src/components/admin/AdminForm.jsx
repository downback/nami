// import React, { useState, useEffect } from "react"
// import {
//   getStorage,
//   ref,
//   listAll,
//   getDownloadURL,
//   uploadBytes,
//   deleteObject,
//   getMetadata, // Uncomment if you want to verify metadata after upload
//   updateMetadata, // Uncomment if you plan to update metadata on existing files
// } from "firebase/storage"
// import {
//   getFirestore,
//   collection,
//   setDoc,
//   doc,
//   getDocs,
//   deleteDoc,
// } from "firebase/firestore"
// import styles from "./AdminForm.module.css"
// import WhiteWrapper from "../ui/WhiteWrapper"

// const AdminForm = ({ folderName, title, isCaption }) => {
//   const db = getFirestore()
//   const [images, setImages] = useState([])
//   const [file, setFile] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [captions, setCaptions] = useState({})
//   const [newCaption, setNewCaption] = useState("")

//   useEffect(() => {
//     const fetchImagesAndCaptions = async () => {
//       const storage = getStorage()
//       const listRef = ref(storage, `${folderName}/`)
//       const response = await listAll(listRef)

//       const urls = await Promise.all(
//         response.items.map(async (item) => {
//           const url = await getDownloadURL(item)
//           return { name: item.name, url }
//         })
//       )

//       setImages(urls)

//       const captionsCollection = collection(db, "galleryCaptions")
//       const captionsSnapshot = await getDocs(captionsCollection)
//       const captionsData = {}
//       captionsSnapshot.forEach((doc) => {
//         captionsData[doc.id] = doc.data().caption
//       })

//       setCaptions(captionsData)
//     }

//     fetchImagesAndCaptions()
//   }, [folderName, db])

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0])
//   }

//   const uploadImage = async () => {
//     if (!file) {
//       alert("Please select a file to upload.")
//       return
//     }

//     setLoading(true)
//     const storage = getStorage()
//     const storageRef = ref(storage, `${folderName}/${file.name}`)

//     const metadata = {
//       cacheControl: "public, max-age=3600",
//     }

//     try {
//       await uploadBytes(storageRef, file, metadata)

//       if (newCaption) {
//         const captionRef = doc(db, "galleryCaptions", file.name)
//         await setDoc(captionRef, { caption: newCaption })
//       }

//       const meta = await getMetadata(storageRef)
//       console.log("Cache-Control metadata:", meta.cacheControl)

//       const newImageUrl = await getDownloadURL(storageRef)
//       const newImage = { name: file.name, url: newImageUrl }
//       setImages([...images, newImage])

//       alert("Image and caption uploaded successfully!")
//       setFile(null)
//       setNewCaption("")

//       // alert("Image and caption uploaded successfully!")
//       // setFile(null)
//       // setNewCaption("")
//       window.location.reload()
//     } catch (error) {
//       alert("Error uploading image: " + error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteImage = async (imageUrl) => {
//     const storage = getStorage()
//     const imageName = imageUrl.split("%2F")[1].split("?")[0]
//     const imageRef = ref(storage, `${folderName}/${imageName}`)

//     if (window.confirm("Are you sure you want to delete this image?")) {
//       try {
//         await deleteObject(imageRef)
//         await deleteDoc(doc(db, "galleryCaptions", imageName))

//         alert("Image and caption deleted successfully!")
//         setImages(images.filter((img) => img.url !== imageUrl))
//       } catch (error) {
//         alert("Error deleting image: " + error.message)
//       }
//     }
//   }

//   return (
//     <WhiteWrapper to="/admin">
//       <div className={styles.container}>
//         <div className={styles.title}>
//           MANAGE
//           <span className={styles.titleStrong}>{title}</span>
//           IMAGES
//         </div>

//         <section className={styles.uploadSection}>
//           <h2 className={styles.sectionTitle}>Upload New Image</h2>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className={styles.fileInput}
//           />
//           {isCaption && (
//             <input
//               type="text"
//               placeholder="Enter caption here..."
//               value={newCaption}
//               onChange={(e) => setNewCaption(e.target.value)}
//               className={styles.captionInput}
//             />
//           )}
//           <button
//             onClick={uploadImage}
//             disabled={loading}
//             className={styles.button}
//           >
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//         </section>

//         <section className={styles.gallerySection}>
//           <h2 className={styles.sectionTitle}>Here Are Uploaded Images!</h2>
//           {images.length === 0 ? (
//             <p>No images found.</p>
//           ) : (
//             <div className={styles.imageGrid}>
//               {images.map((image, index) => (
//                 <div key={index} className={styles.imageWrapper}>
//                   <img
//                     src={image.url}
//                     alt={`${folderName} Image${index + 1}`}
//                     className={styles.image}
//                   />
//                   {isCaption && (
//                     <div className={styles.captionContainer}>
//                       <div className={styles.captionTitle}>
//                         {folderName} image{index + 1} caption text:
//                       </div>
//                       {captions[image.name] ? (
//                         <div>{captions[image.name]}</div>
//                       ) : (
//                         <div className={styles.noCaption}>none</div>
//                       )}
//                     </div>
//                   )}
//                   <button
//                     onClick={() => deleteImage(image.url)}
//                     className={styles.deleteButton}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </WhiteWrapper>
//   )
// }

// export default AdminForm

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
  updateDoc,
} from "firebase/firestore"
import styles from "./AdminForm.module.css"
import WhiteWrapper from "../ui/WhiteWrapper"

const AdminForm = ({ folderName, title, isCaption }) => {
  const db = getFirestore()
  const [images, setImages] = useState([]) // Each image will now have { name, url, order }
  // captions state remains separate and only stores caption text
  const [captions, setCaptions] = useState({})
  const [file, setFile] = useState(null)
  const [newCaption, setNewCaption] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImagesAndCaptions = async () => {
      const storage = getStorage()
      const listRef = ref(storage, `${folderName}/`)
      const response = await listAll(listRef)

      // Get image URLs from Firebase Storage
      const urls = await Promise.all(
        response.items.map(async (item) => {
          const url = await getDownloadURL(item)
          return { name: item.name, url }
        })
      )

      // Fetch caption and order info from Firestore
      const captionsCollection = collection(db, "galleryCaptions")
      const captionsSnapshot = await getDocs(captionsCollection)
      const captionsData = {} // Only caption text
      const orderData = {} // Mapping imageName -> order
      captionsSnapshot.forEach((docSnap) => {
        const data = docSnap.data()
        captionsData[docSnap.id] = data.caption
        orderData[docSnap.id] = data.order
      })

      // Merge order into the images array; if order is missing, assign a default high value so it goes to the bottom.
      const sortedImages = urls
        .map((img) => ({
          ...img,
          order: orderData[img.name] !== undefined ? orderData[img.name] : 9999,
        }))
        .sort((a, b) => a.order - b.order)

      setImages(sortedImages)
      setCaptions(captionsData)
    }

    fetchImagesAndCaptions()
  }, [folderName, db])

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

    // Set Cache-Control header to cache for one week (604800 seconds)
    const metadata = {
      cacheControl: "public, max-age=604800",
    }

    try {
      await uploadBytes(storageRef, file, metadata)

      // Determine default order for the new image.
      // If there are existing images, set order to max existing order + 1; otherwise, use 0.
      const newOrder =
        images.length > 0 ? Math.max(...images.map((img) => img.order)) + 1 : 0

      // Save caption and order to Firestore
      const captionRef = doc(db, "galleryCaptions", file.name)
      await setDoc(captionRef, { caption: newCaption || "", order: newOrder })

      const newImageUrl = await getDownloadURL(storageRef)
      const newImage = { name: file.name, url: newImageUrl, order: newOrder }
      const updatedImages = [...images, newImage].sort(
        (a, b) => a.order - b.order
      )
      setImages(updatedImages)
      setCaptions((prev) => ({
        ...prev,
        [file.name]: newCaption || "",
      }))

      alert("Image and caption uploaded successfully!")
      setFile(null)
      setNewCaption("")
    } catch (error) {
      alert("Error uploading image: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (imageUrl) => {
    const storage = getStorage()
    // Extract the file name from the URL
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

  // Separate swapImageOrder method using images state
  const swapImageOrder = async (indexA, indexB) => {
    if (
      indexA < 0 ||
      indexB < 0 ||
      indexA >= images.length ||
      indexB >= images.length
    ) {
      return
    }

    const imageA = images[indexA]
    const imageB = images[indexB]
    const orderA = imageA.order
    const orderB = imageB.order

    try {
      const captionRefA = doc(db, "galleryCaptions", imageA.name)
      const captionRefB = doc(db, "galleryCaptions", imageB.name)
      await Promise.all([
        updateDoc(captionRefA, { order: orderB }),
        updateDoc(captionRefB, { order: orderA }),
      ])
      // Swap order values locally and resort the images array
      const updatedImages = [...images]
      updatedImages[indexA] = { ...imageA, order: orderB }
      updatedImages[indexB] = { ...imageB, order: orderA }
      updatedImages.sort((a, b) => a.order - b.order)
      setImages(updatedImages)
    } catch (error) {
      alert("Error updating order: " + error.message)
    }
  }

  const moveImageUp = async (index) => {
    if (index === 0) return // Already at the top
    await swapImageOrder(index - 1, index)
  }

  const moveImageDown = async (index) => {
    if (index === images.length - 1) return // Already at the bottom
    await swapImageOrder(index, index + 1)
  }

  return (
    <WhiteWrapper to="/admin">
      <div className={styles.container}>
        <div className={styles.title}>
          MANAGE <span className={styles.titleStrong}>{title}</span> IMAGES
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
                    alt={`${folderName} Image ${index + 1}`}
                    className={styles.image}
                  />
                  {isCaption && (
                    <div className={styles.captionContainer}>
                      <div className={styles.captionTitle}>
                        {folderName} image {index + 1} caption text:
                      </div>
                      <div>{captions[image.name] || "none"}</div>
                    </div>
                  )}
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => moveImageUp(index)}
                      className={styles.orderButton}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveImageDown(index)}
                      className={styles.orderButton}
                      disabled={index === images.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => deleteImage(image.url)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
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
