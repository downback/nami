import React, { useState, useEffect } from "react"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "../../services/firebase-config"
import styles from "./AdminDateUpdate.module.css"

function AdminDateUpdate() {
  const [dates, setDates] = useState([])
  const [newDate, setNewDate] = useState("")

  const formatDate = (date) => {
    const targetTime = new Date(date)
    // targetTime.setHours(14, 0, 0, 0)
    return targetTime.toISOString().split("T")[0] // Return only the date part
  }

  // Fetch available dates from Firestore
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "availableDates"))
        const fetchedDates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setDates(fetchedDates)
        console.log("Fetched dates successfully:", fetchedDates)
      } catch (error) {
        console.error("Error fetching dates:", error)
      }
    }

    fetchDates()
  }, [])

  // Add a new date
  const handleAddDate = async () => {
    if (!newDate) {
      alert("Please enter a valid date")
      return
    }

    try {
      const formattedDate = formatDate(newDate)
      const docRef = await addDoc(collection(db, "availableDates"), {
        date: formattedDate,
        isAvailable: true,
      })
      setDates((prev) => [
        ...prev,
        { id: docRef.id, date: newDate, isAvailable: true },
      ])
      console.log("Added new date successfully:", newDate)
      setNewDate("")
    } catch (error) {
      console.error("Error adding date:", error)
    }
  }

  // Toggle availability
  const toggleAvailability = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "availableDates", id), {
        isAvailable: !currentStatus,
      })
      setDates((prev) =>
        prev.map((date) =>
          date.id === id ? { ...date, isAvailable: !currentStatus } : date
        )
      )
      console.log(
        `Toggled availability for date ID: ${id}, New Status: ${!currentStatus}`
      )
    } catch (error) {
      console.error("Error updating availability:", error)
    }
  }

  // Delete a date
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "availableDates", id))
      setDates((prev) => prev.filter((date) => date.id !== id))
      console.log(`Deleted date with ID: ${id}`)
    } catch (error) {
      console.error("Error deleting date:", error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Admin Page</h1>

      {/* Add Date Section */}
      <div className={styles.addDateSection}>
        <h3>Add a New Date</h3>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAddDate} className={styles.addButton}>
          Add Date
        </button>
      </div>

      {/* Manage Dates Section */}
      <div className={styles.manageDatesSection}>
        <h3>Manage Dates</h3>
        <div className={styles.grid}>
          <div className={styles.gridHeader}>Date</div>
          <div className={styles.gridHeader}>Availability</div>
          <div className={styles.gridHeader}>Actions</div>

          {dates.map((date) => (
            <React.Fragment key={date.id}>
              <div className={styles.gridItem}>{date.date}</div>
              <div className={styles.gridItem}>
                {date.isAvailable ? "Available" : "Unavailable"}
              </div>
              <div className={styles.gridItem}>
                <button
                  onClick={() => toggleAvailability(date.id, date.isAvailable)}
                  className={styles.toggleButton}
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDelete(date.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
        {dates.length === 0 && (
          <p className={styles.noDatesMessage}>
            No dates available. Add a new date above.
          </p>
        )}
      </div>
    </div>
  )
}

export default AdminDateUpdate
