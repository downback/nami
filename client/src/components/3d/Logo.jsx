import React, { useRef, useLayoutEffect, useState } from "react"
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
  const { nodes, materials } = useGLTF("/namilogo.glb")
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

  // useFrame(() => {
  //   logo.current.rotation.y += 0.01 // Add rotation animation
  // })

  const [stopRotation, setStopRotation] = useState(false)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    if (logo.current && !stopRotation) {
      // logo.current.rotation.y += 0.005
      logo.current.rotation.x = Math.sin(elapsedTime * 0.3)
    }
  })

  //UseGSAP
  useGSAP(() => {
    tl.from(scene.position, {
      z: -5,
      duration: 2.5,
      ease: "power2.out",
    })
    // Animation for #landing_section-2
    tl.to(scene.position, {
      x: -2.05,
      y: 1.75,
      z: -0.95,
      scrollTrigger: {
        trigger: "#landing_section-2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        markers: false,
        id: "trigger1",
        immediateRender: false,
        onEnter: () => setStopRotation(true),
        onLeaveBack: () => setStopRotation(false),
      },
    })
      .to(scene.rotation, {
        x: -0.68,
        y: -0.44,
        z: -0.31,
        scrollTrigger: {
          trigger: "#landing_section-2",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          immediateRender: false,
        },
      })

      // Animation for #landing_section-3
      .to(scene.position, {
        x: 2.15,
        y: -0.75,
        z: -0.45,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          markers: false,
          id: "trigger2",
          immediateRender: false,
        },
      })
      .to(scene.rotation, {
        x: 0.2,
        y: 0.47,
        z: -0.2,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          markers: false,
          id: "trigger2",
          immediateRender: false,
        },
      })

      // Animation for #landing_section-4
      .to(scene.position, {
        x: 0,
        y: 0,
        z: -2.0,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-4",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          markers: false,
          id: "trigger2",
          immediateRender: false,
        },
      })
      .to(scene.rotation, {
        x: 0,
        y: 0,
        z: 0,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-4",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          markers: false,
          id: "trigger2",
          immediateRender: false,
        },
      })
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [scene])

  return (
    <>
      <directionalLight
        castShadow
        position={[-2.38, 1.32, 0.74]}
        intensity={5}
      />
      <ambientLight intensity={0.5} />
      <group
        {...props}
        dispose={null}
        ref={logo}
        position={[0, 0, -2.6]}
        rotation={[90, 0, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={nodes.Mesh_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_2.geometry}
          material={nodes.Mesh_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_3.geometry}
          material={nodes.Mesh_3.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_4.geometry}
          material={nodes.Mesh_4.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_5.geometry}
          material={nodes.Mesh_5.material}
        />
      </group>
    </>
  )
}

useGLTF.preload("/namilogo.glb")
