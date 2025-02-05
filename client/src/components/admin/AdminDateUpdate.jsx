import React, { useState, useEffect } from "react"
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import styles from "./AdminDateUpdate.module.css"
import WhiteWrapper from "../ui/WhiteWrapper"

function AdminDateUpdate() {
  const db = getFirestore()
  const [dates, setDates] = useState([])
  const [newDate, setNewDate] = useState("")

  const formatDate = (date) => {
    const targetTime = new Date(date)
    return targetTime.toISOString().split("T")[0]
  }

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "availableDates"))
        const fetchedDates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setDates(fetchedDates)
      } catch (error) {
        console.error("Error fetching dates:", error)
      }
    }

    fetchDates()
  }, [])

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
      alert("New Date added successfully!")
      setNewDate("")
    } catch (error) {
      console.error("Error adding date:", error)
    }
  }

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
      alert("Availability status updated successfully!")
    } catch (error) {
      console.error("Error updating availability:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "availableDates", id))
      setDates((prev) => prev.filter((date) => date.id !== id))
      alert("A Date deleted successfully!")
      console.log(`Deleted date with ID: ${id}`)
    } catch (error) {
      console.error("Error deleting date:", error)
    }
  }

  return (
    <WhiteWrapper to="/admin">
      <div className={styles.container}>
        <div className={styles.title}>
          MANAGE<span className={styles.titleStrong}>Available Dates</span>
        </div>

        <div className={styles.addDateSection}>
          <h3 className={styles.sectionTitle}>Add a New Date Here!</h3>
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

        <div className={styles.manageDatesSection}>
          <h3 className={styles.sectionTitle}>Manage Dates Here!</h3>
          <div className={styles.grid}>
            <div className={styles.gridHeader}>Date</div>
            <div className={styles.gridHeader}>Availability</div>
            <div className={styles.gridHeader}>Change</div>

            {dates.map((date) => (
              <React.Fragment key={date.id}>
                <div className={styles.gridItem}>{date.date}</div>
                <div className={styles.gridItem}>
                  {date.isAvailable ? (
                    <div className={styles.green}>Available</div>
                  ) : (
                    <div className={styles.red}>Unavailable</div>
                  )}
                </div>
                <div className={styles.gridItem}>
                  <button
                    onClick={() =>
                      toggleAvailability(date.id, date.isAvailable)
                    }
                    className={styles.toggleButton}
                  >
                    Change Availability
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
    </WhiteWrapper>
  )
}

export default AdminDateUpdate
