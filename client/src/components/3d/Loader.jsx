import React from "react"
import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading 3D Model...</p>
    </div>
  )
}

export default Loader
