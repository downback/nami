import React, { useRef } from "react"
import Navbar from "../components/ui/NavBar"
import Model from "../components/3d/Model"
import LandingAnimation from "../components/LandingAnimation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import styles from "./HomePage.module.css"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
gsap.registerPlugin(useGSAP)

const HomePage = () => {
  const pageContainer = useRef()
  const background = useRef()

  useGSAP(() => {
    const backgroundAnimation = gsap.timeline()
    backgroundAnimation.to(background.current, {
      "--bg-color": "white",
      duration: 0.1,
    })

    ScrollTrigger.create({
      animation: backgroundAnimation,
      trigger: "#landing_section-2",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    })
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundColor} ref={background}></div>
      <Navbar pageContainer={pageContainer} />
      <div className={styles.modelContainer}>
        <Model />
      </div>
      <LandingAnimation />
      <div className={styles.footerContainer}>
        <Link to="/privacy-policy" className={styles.footer}>
          Privacy Policy
        </Link>
        <Link to="/imprint" className={styles.footer}>
          Imprint
        </Link>
      </div>
    </div>
  )
}

export default HomePage
