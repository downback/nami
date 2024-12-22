import React from "react"
import styles from "./Modal.module.css"

const Modal = ({ isVisible, onClose, title, message, buttonText }) => {
  if (!isVisible) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalText}>{title}</div>
        <div>{message}</div>
        <button onClick={onClose} className={styles.modalButton}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Modal
