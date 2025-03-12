import React, { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useNavigate } from "react-router-dom"

import styles from "./Navbar.module.css"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
gsap.registerPlugin(useGSAP)

const Navbar = () => {
  const linksRef = useRef([])
  const navbarContainer = useRef()
  const navbar = useRef()
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top -200",
      end: "bottom 500",
      toggleClass: {
        targets: navbar.current,
        className: `${styles.isActive}`,
      },
    })

    const links = linksRef.current

    links.forEach((link) => {
      const targetSection = document.querySelector(link.getAttribute("href"))

      if (targetSection) {
        ScrollTrigger.create({
          trigger: targetSection,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              links.forEach((l) => l.classList.remove(styles.active))
              link.classList.add(styles.active)
            }
          },
        })
      }

      link.addEventListener("click", (e) => {
        e.preventDefault()

        if (isNavigating) return

        setIsNavigating(true)

        links.forEach((l) => l.classList.remove(styles.active))
        link.classList.add(styles.active)

        gsap.to(window, {
          duration: 1,
          scrollTo: targetSection,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            setTimeout(() => {
              navigate(`/${link.id}`)
              window.scrollTo(0, 0)
              setIsNavigating(false)
            }, 600)
          },
        })
      })
    })
  }, [isNavigating])

  return (
    <nav ref={navbarContainer} className={styles.navbar}>
      <ul ref={navbar} className={styles.navLinks} id="navWrapper">
        <li>
          <a
            href="#landing_section-1"
            className={`${styles.navItem} ${
              isNavigating ? styles.disabled : ""
            }`}
            ref={(el) => (linksRef.current[0] = el)}
          >
            HOME
          </a>
        </li>
        <li>
          <a
            href="#landing_section-2"
            className={`${styles.navItem} ${
              isNavigating ? styles.disabled : ""
            }`}
            ref={(el) => (linksRef.current[1] = el)}
            id="booking"
          >
            Booking
          </a>
        </li>
        <li>
          <a
            href="#landing_section-3"
            className={`${styles.navItem} ${
              isNavigating ? styles.disabled : ""
            }`}
            ref={(el) => (linksRef.current[2] = el)}
            id="flash"
          >
            Flash
          </a>
        </li>
        <li>
          <a
            href="#landing_section-4"
            className={`${styles.navItem} ${
              isNavigating ? styles.disabled : ""
            }`}
            ref={(el) => (linksRef.current[3] = el)}
            id="gallery"
          >
            Work
          </a>
        </li>
        <li>
          <a
            href="#landing_section-5"
            className={`${styles.navItem} ${
              isNavigating ? styles.disabled : ""
            }`}
            ref={(el) => (linksRef.current[4] = el)}
            id="contact"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
