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
        onCreated={() => setLoading(false)}
      >
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />
        <Suspense fallback={null}>
          <Logo scale={10} onLoad={handleLoad} />
        </Suspense>
        <Environment preset="studio" />
      </Canvas>
    </>
  )
}

export default Model
