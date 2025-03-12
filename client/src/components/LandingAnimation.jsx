import React, { useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import SplitType from "split-type"

import styles from "./LandingAnimation.module.css"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
gsap.registerPlugin(useGSAP)

function LandingAnimation() {
  const landingPage = useRef()
  const landingSection2 = useRef()
  const landingSection3 = useRef()
  const landingSection4 = useRef()
  const landingSection5 = useRef()
  const textAnimations = useRef([])

  useGSAP(
    () => {
      // textAnimations.current.forEach((target) => {
      //   const sectionId = target ? target.getAttribute("data-target") : null
      //   if (sectionId === null) {
      //     console.error(
      //       "Target element is null or does not have the 'data-target' attribute."
      //     )
      //   }
      //   const targetSection = document.querySelector(`#${sectionId}`)

      //   if (targetSection) {
      //     const splitInstance = new SplitType(target, { types: "chars" })
      //     const chars = splitInstance.chars

      //     gsap.from(chars, {
      //       duration: 0.5,
      //       ease: "power2.out",
      //       stagger: 0.05,
      //       scrollTrigger: {
      //         trigger: targetSection,
      //         start: "top 100",
      //         end: "+=100%",
      //         toggleActions: "play none reverse none",
      //       },
      //     })
      //   }
      // })

      gsap.to(landingSection2.current, {
        scrollTrigger: {
          trigger: "#landing_section-2",
          start: "top top",
          end: "+=100%",
        },
      })

      gsap.to(landingSection3.current, {
        scrollTrigger: {
          trigger: "#landing_section-3",
          start: "top top",
          end: "+=100%",
        },
      })

      gsap.to(landingSection4.current, {
        scrollTrigger: {
          trigger: "#landing_section-4",
          start: "top top",
          end: "+=100%",
        },
      })

      gsap.to(landingSection5.current, {
        scrollTrigger: {
          trigger: "#landing_section-5",
          start: "top top",
          end: "+=100%",
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
        <div className={`${styles.landingContents} ${styles.flashContent}`}>
          <Link to="/flash" className={styles.contentsText}>
            <div
              ref={(el) => (textAnimations.current[0] = el)}
              data-target="landing_section-2"
            ></div>
          </Link>
        </div>
      </section>
      <section
        id="landing_section-3"
        className={styles.landingSection}
        ref={landingSection3}
      >
        <div className={`${styles.landingContents} ${styles.bookingContent}`}>
          <Link to="/booking" className={styles.contentsText}>
            <div
              ref={(el) => (textAnimations.current[1] = el)}
              data-target="landing_section-3"
            ></div>
          </Link>
        </div>
      </section>
      <section
        id="landing_section-4"
        className={styles.landingSection}
        ref={landingSection4}
      >
        <div className={`${styles.landingContents} ${styles.galleryContent}`}>
          <Link to="/gallery" className={styles.contentsText}>
            <div
              ref={(el) => (textAnimations.current[2] = el)}
              data-target="landing_section-4"
            ></div>
          </Link>
        </div>
      </section>
      <section
        id="landing_section-5"
        className={styles.landingSection}
        ref={landingSection5}
      >
        <div className={`${styles.landingContents} ${styles.galleryContent}`}>
          <Link to="/contact" className={styles.contentsText}>
            <div
              ref={(el) => (textAnimations.current[3] = el)}
              data-target="landing_section-5"
            ></div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingAnimation
