import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./AdminPage.module.css"

const AdminPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => navigate("/admin/gallery")}
        >
          Manage Gallery
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/admin/flash")}
        >
          Manage Flash
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/admin/dates")}
        >
          Manage Date
        </button>
      </div>
    </div>
  )
}

export default AdminPage
