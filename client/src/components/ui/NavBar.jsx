import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useNavigate } from "react-router-dom"

import styles from "./Navbar.module.css"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
gsap.registerPlugin(useGSAP)

const Navbar = ({ pageContainer }) => {
  const linksRef = useRef([])
  const navbarContainer = useRef()
  const navbar = useRef()
  const navigate = useNavigate()

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top -200",
      end: "bottom 500",
      id: "navbar",
      markers: false,
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
            }, 2000)
          },
        })
      })
    })
  }, [])

  return (
    <nav ref={navbarContainer} className={styles.navbar}>
      <ul ref={navbar} className={styles.navLinks} id="navWrapper">
        <li>
          <a
            href="#landing_section-1"
            className={styles.navItem}
            ref={(el) => (linksRef.current[0] = el)}
          >
            HOME
          </a>
        </li>
        <li>
          <a
            href="#landing_section-2"
            className={styles.navItem}
            ref={(el) => (linksRef.current[1] = el)}
            id="flash"
          >
            Flash
          </a>
        </li>
        <li>
          <a
            href="#landing_section-3"
            className={styles.navItem}
            ref={(el) => (linksRef.current[2] = el)}
            id="booking"
          >
            Booking
          </a>
        </li>
        <li>
          <a
            href="#landing_section-4"
            className={styles.navItem}
            ref={(el) => (linksRef.current[3] = el)}
            id="gallery"
          >
            Gallery
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
