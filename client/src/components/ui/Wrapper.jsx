import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Wrapper.module.css"

const Wrapper = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.overlay}>
      <div className={styles.contentContainer}>
        <button className={styles.closeButton} onClick={() => navigate("/")}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default Wrapper
