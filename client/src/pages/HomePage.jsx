// HomePage.jsx
import React from "react"
import styles from "./HomePage.module.css"
import Navbar from "../components/NavBar"
import Model from "../components/3d/Model"

const HomePage = () => (
  <div className={styles.container}>
    <Navbar />
    <h1 className={styles.title}>Welcome to the Tattoo Portfolio</h1>
    <p className={styles.description}>
      Explore our amazing designs and book your appointment!
    </p>
    <div className={styles.modelContainer}>
      <Model />
    </div>
  </div>
)

export default HomePage
