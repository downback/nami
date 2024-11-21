import React, { useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import styles from "./LandingAnimation.module.css"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
gsap.registerPlugin(useGSAP)

function LandingAnimation() {
  const landingPage = useRef()
  const landingSection2 = useRef()
  const landingSection3 = useRef()
  const landingSection4 = useRef()

  useGSAP(
    () => {
      gsap.to(landingSection2.current, {
        scrollTrigger: {
          trigger: "#landing_section-2",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false,
          id: "textPin1",
        },
      })

      gsap.to(landingSection3.current, {
        scrollTrigger: {
          trigger: "#landing_section-3",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false,
          id: "textPin2",
        },
      })

      gsap.to(landingSection4.current, {
        scrollTrigger: {
          trigger: "#landing_section-4",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false,
          id: "textPin3",
        },
      })
    },
    { landingPage }
  )

  return (
    <div className={styles.landingContainer} ref={landingPage}>
      <section
        id="landing_section-1"
        className={styles.landingSection}
      ></section>

      <section
        id="landing_section-2"
        className={styles.landingSection}
        ref={landingSection2}
      >
        <div className={`${styles.landingContents} ${styles.flashSection}`}>
          <Link to="/flash" className={styles.contentsText}>
            Flash
          </Link>
        </div>
      </section>
      <section
        id="landing_section-3"
        className={styles.landingSection}
        ref={landingSection3}
      >
        <div className={`${styles.landingContents} ${styles.bookingSection}`}>
          <Link to="/booking" className={styles.contentsText}>
            Booking
          </Link>
        </div>
      </section>
      <section
        id="landing_section-4"
        className={styles.landingSection}
        ref={landingSection4}
      >
        <div className={`${styles.landingContents} ${styles.gallerySection}`}>
          <Link to="/gallery" className={styles.contentsText}>
            Gallery
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingAnimation
