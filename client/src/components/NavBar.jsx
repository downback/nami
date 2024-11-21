import React from "react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navItem}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/flash" className={styles.navItem}>
            Flash
          </Link>
        </li>
        <li>
          <Link to="/booking" className={styles.navItem}>
            Booking
          </Link>
        </li>
        <li>
          <Link to="/gallery" className={styles.navItem}>
            Gallery
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
