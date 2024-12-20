import { Canvas } from "@react-three/fiber"
import { Logo } from "./Logo"
import { Environment, OrbitControls } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { Suspense } from "react"

// without registering scrolltriiger the model will break
gsap.registerPlugin(ScrollTrigger)

const Model = () => {
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
  return (
    <Canvas
      camera={{
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      }}
      shadows
    >
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <Logo scale={10} />
      {/* <Suspense fallback={<Loading />}>
      </Suspense> */}
      <Environment preset="warehouse" />
    </Canvas>
  )
}

export default Model

//TODO city | warehouse -> dimmed
