import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./WhiteWrapper.module.css"
import { IoArrowBackOutline } from "react-icons/io5"

const WhiteWrapper = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.overlay}>
      <div className={styles.contentContainer}>
        <div
          className={styles.backButtonContainer}
          onClick={() => navigate("/")}
        >
          <IoArrowBackOutline className={styles.backButton} />
        </div>
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </div>
  )
}

export default WhiteWrapper
