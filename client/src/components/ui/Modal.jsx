import React from "react"
import styles from "./Modal.module.css"
import { IoCloseOutline } from "react-icons/io5"

const Modal = ({ isVisible, onClose, title, message, buttonText }) => {
  if (!isVisible) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalText}>
          {typeof title === "string" ? <h3>{title}</h3> : title}
        </div>
        <div className={styles.modalMessage}>
          {typeof message === "string" ? <p>{message}</p> : message}
        </div>
        <div className={styles.modalButtonContainer}>
          {typeof message === "string" ? (
            <button onClick={onClose} className={styles.modalButton}>
              {buttonText}
            </button>
          ) : (
            buttonText
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
