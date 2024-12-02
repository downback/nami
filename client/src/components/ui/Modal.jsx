import React from "react"
import styles from "./Modal.module.css"

const Modal = ({ isVisible, onClose, message, buttonText }) => {
  if (!isVisible) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Booking Request Sent!</h2>
        <p>{message}</p>
        <button onClick={onClose} className={styles.modalButton}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Modal
