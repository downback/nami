import React, { useRef } from "react"
import Navbar from "../components/NavBar"
import Model from "../components/3d/Model"
import LandingAnimation from "../components/LandingAnimation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import styles from "./HomePage.module.css"

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
      markers: false,
      id: "intro",
    })
  }, [])

  "body", { "--bg-color": "red" }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundColor} ref={background}></div>
      <Navbar />
      <div className={styles.modelContainer}>
        <Model />
      </div>
      <LandingAnimation />
      <div className={styles.footer}>copyright</div>
    </div>
  )
}

export default HomePage
