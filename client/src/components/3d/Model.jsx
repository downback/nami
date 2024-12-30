import { Canvas } from "@react-three/fiber"
import { Logo } from "./Logo"
import { Environment, OrbitControls } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { Suspense, useState } from "react"
import Loader from "./Loader"

gsap.registerPlugin(ScrollTrigger)

const Model = () => {
  const [loading, setLoading] = useState(true)
  //   apartment: 'lebombo_1k.hdr'
  // city: 'potsdamer_platz_1k.hdr'
  // dawn: 'kiara_1_dawn_1k.hdr'
  // forest: 'forest_slope_1k.hdr'
  // lobby: 'st_fagans_interior_1k.hdr'
  // night: 'dikhololo_night_1k.hdr'
  // park: 'rooitou_park_1k.hdr'
  // studio: 'studio_small_03_1k.hdr'
  // sunset: 'venice_sunset_1k.hdr'
  // warehouse: 'empty_warehouse_01_1k.hdr'
  const handleLoad = () => {
    setLoading(false)
  }
  return (
    <>
      {loading && <Loader />}
      <Canvas
        camera={{
          position: [0, 0, 0],
          rotation: [0, 0, 0],
        }}
        shadows
        onCreated={() => setLoading(false)} // Mark loading complete when canvas is ready
      >
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />
        <Suspense fallback={null}>
          <Logo scale={10} onLoad={handleLoad} />
        </Suspense>
        <Environment preset="night" />
      </Canvas>
    </>
  )
}

export default Model

//MEMO city | warehouse -> dimmed
