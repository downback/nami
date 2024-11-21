import React, { useRef, useLayoutEffect } from "react"
import { useGLTF, useScroll } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useControls } from "leva"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
gsap.registerPlugin(useGSAP)

export function Logo(props) {
  const { nodes, materials } = useGLTF("/model.glb")
  const logo = useRef()
  const { scene, camera } = useThree()
  const tl = gsap.timeline()

  // const { cameraPosition, cameraRotation, scenePosition, sceneRotation } =
  //   useControls({
  //     cameraPosition: {
  //       value: {
  //         x: 0,
  //         y: 0,
  //         z: 0,
  //       },
  //       step: 0.05,
  //     },
  //     cameraRotation: {
  //       value: {
  //         x: 0,
  //         y: 0,
  //         z: 0,
  //       },
  //       step: 0.01,
  //     },
  //     scenePosition: {
  //       value: { x: 0, y: 0, z: 0 },
  //       step: 0.05,
  //     },

  //     sceneRotation: {
  //       value: { x: 0, y: 0, z: 0 },
  //       step: 0.01,
  //     },
  //   })

  // useFrame(() => {
  //   camera.position.x = cameraPosition.x
  //   camera.position.y = cameraPosition.y
  //   camera.position.z = cameraPosition.z
  //   camera.rotation.x = cameraRotation.x
  //   camera.rotation.y = cameraRotation.y
  //   camera.rotation.z = cameraRotation.z
  //   scene.position.x = scenePosition.x
  //   scene.position.y = scenePosition.y
  //   scene.position.z = scenePosition.z
  //   scene.rotation.x = sceneRotation.x
  //   scene.rotation.y = sceneRotation.y
  //   scene.rotation.z = sceneRotation.z
  // })

  // console.log(scene.position)
  // console.log(scene.rotation)

  //   useLayoutEffect(() => {
  //     new ScrollTrigger({})
  //     // component About.tsx
  //     tl.to(scene.position, {
  //       x: -2.05,
  //       y: 1.75,
  //       z: -0.95,

  //       scrollTrigger: {
  //         trigger: "#animationTrigger1",
  //         start: "top bottom",
  //         end: "bottom bottom",
  //         scrub: true,
  //         markers: false,
  //         id: "trigger1",

  //         immediateRender: false,
  //       },
  //     })
  //       .to(scene.rotation, {
  //         x: -0.68,
  //         y: -0.44,
  //         z: -0.31,

  //         scrollTrigger: {
  //           trigger: "#animationTrigger1",
  //           start: "top bottom",
  //           end: "bottom bottom",
  //           scrub: true,

  //           immediateRender: false,
  //         },
  //       })

  //       // component - BuyNow.tsx
  //       .to(scene.position, {
  //         x: 2.45,
  //         y: -1.65,
  //         z: -0.45,
  //         delay: 2,
  //         scrollTrigger: {
  //           trigger: "#animationTrigger2",
  //           start: "top bottom",
  //           end: "bottom bottom",
  //           scrub: true,
  //           markers: false,
  //           id: "trigger2",
  //           immediateRender: false,
  //         },
  //       })
  //       .to(scene.rotation, {
  //         x: 0.58,
  //         y: 0.47,
  //         z: -0.2,
  //         delay: 2,
  //         scrollTrigger: {
  //           trigger: "#animationTrigger2",
  //           start: "top bottom",
  //           end: "bottom bottom",
  //           scrub: true,
  //           markers: false,
  //           id: "trigger2",
  //           immediateRender: false,
  //         },
  //       })
  //   }, [])

  return (
    <group
      {...props}
      dispose={null}
      ref={logo}
      position={[0, 0, -2.6]}
      rotation={[90, 0, 0]}
    >
      <mesh geometry={nodes.Asset_3.geometry} material={materials.Matalic} />
    </group>
  )
}

useGLTF.preload("/model.glb")
