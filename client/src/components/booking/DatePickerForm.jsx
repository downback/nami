import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./DatePickerForm.module.css"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebase-config"
import moment from "moment-timezone"

function DatePickerForm({ selectedDate, setFieldValue }) {
  const [availableDates, setAvailableDates] = useState([])

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "availableDates"))
        const dates = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            date: data.date,
          }
        })
        setAvailableDates(dates)
      } catch (error) {
        console.error("Error fetching available dates:", error)
      }
    }

    fetchDates()
  }, [])

  const isDateAvailable = (date) => {
    return availableDates.some(
      (d) =>
        d.isAvailable &&
        new Date(d.date).getFullYear() == date.getFullYear() &&
        new Date(d.date).getMonth() == date.getMonth() &&
        new Date(d.date).getDate() == date.getDate()
    )
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setFieldValue("date", date)}
      dateFormat="yyyy/MM/dd"
      placeholderText="Select a date"
      className={styles.datePickerInput}
      calendarClassName={styles.datePickerCalendar}
      filterDate={isDateAvailable}
    />
  )
}

export default DatePickerForm
