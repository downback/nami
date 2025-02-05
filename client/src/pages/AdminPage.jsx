import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../services/firebase-config"
import Modal from "../components/ui/Modal"

import styles from "./AdminPage.module.css"

const AdminPage = () => {
  const [modalVisible, setModalVisible] = useState(true)

  const auth = getAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const closeModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setModalVisible(false)
      } else {
        setIsAuthenticated(false)
        setModalVisible(true)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setError("")
      setModalVisible(false)
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setIsAuthenticated(false)
    setModalVisible(true)
  }

  return (
    <div className={styles.container}>
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="*Managing Images & Dates with Authentication*"
        message={
          <div className={styles.loginInputContainer}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.loginInput}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>
        }
        buttonText={
          <button onClick={handleLogin} className={styles.loginButton}>
            Login
          </button>
        }
      />
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
      <h1 className={styles.title}>Managing Images & Dates</h1>
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => navigate("/admin/dates")}
        >
          Available Dates
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/admin/flash")}
        >
          Flash Page Images
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/admin/gallery")}
        >
          Gallery Page Images
        </button>
      </div>
    </div>
  )
}

export default AdminPage
