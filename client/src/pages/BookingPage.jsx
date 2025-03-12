import React from "react"
import BookingForm from "../components/booking/BookingForm"
import { useNavigate } from "react-router-dom"
import { SlArrowLeft } from "react-icons/sl"

import styles from "./BookingPage.module.css"

const BookingPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className={styles.backButtonContainer} onClick={() => navigate("/")}>
        <SlArrowLeft className={styles.backButton} />
      </div>
      <BookingForm />
    </div>
  )
}

export default BookingPage
