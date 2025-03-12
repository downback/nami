import React from "react"
import { useNavigate } from "react-router-dom"
import { SlArrowLeft } from "react-icons/sl"
import { CiInstagram } from "react-icons/ci"

import styles from "./ContactPage.module.css"

function ContactPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.backButtonContainer} onClick={() => navigate("/")}>
        <SlArrowLeft className={styles.backButton} />
      </div>
      <div className={styles.title}>Contact</div>
      <div className={styles.contentWrapper}>
        <p>
          If you have a creative project in mind to collaborate with me or want
          to purchase graphic work, feel free to reach out. Looking forward to
          hearing from you.
        </p>
        <div className={styles.contentLinkWrapper}>
          <a href="mailto:namnami.tt@gmail.com" className={styles.contentLink}>
            namnami.tt@gmail.com
          </a>
          <a
            href="https://www.instagram.com/nam.namii_?igsh=MWtzanU1dW9vc3NhYQ%3D%3D&utm_source=qr"
            target="_blank"
            className={styles.contentLink}
          >
            <CiInstagram />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
