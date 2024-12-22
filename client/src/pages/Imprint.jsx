import React from "react"
import BlackWrapper from "../components/ui/BlackWrapper"
import styles from "./Copyright.module.css"

function Imprint() {
  return (
    <BlackWrapper>
      <div className={styles.ImprintContainer}>
        <h4 className={styles.TitleText}>Imprint</h4>
        <div className={styles.ImprintText}>Henam Shin</div>
        <div className={styles.ImprintText}>namnami.tt@gmail.com</div>
        <div className={styles.ImprintText}>
          All rights reserved. No unauthorized use, copying or reproduction of
          the images and/or text, whether for personal or commercial purposes,
          without the written permission of the artist (see details above).
        </div>
        <div className={styles.ImprintText}>
          The artist does not take responsibility for the views expressed in, or
          contents of, external links.
        </div>
        <div className={styles.ImprintText}>©Henam Shin</div>
        <div className={styles.ImprintText}>
          This website was built by{" "}
          <a className={styles.LinkText} href="" target="_blank">
            Daeun Park
          </a>
        </div>
      </div>
    </BlackWrapper>
  )
}

export default Imprint
