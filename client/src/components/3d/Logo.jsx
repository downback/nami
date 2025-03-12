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
  const { nodes, materials } = useGLTF("/Namilogo.glb")
  const logo = useRef()
  const { scene, camera } = useThree()
  const tl = gsap.timeline()

  // animation location test

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
  //       value: { x: 2.15, y: -0.75, z: -0.45 },
  //       step: 0.05,
  //     },

  //     sceneRotation: {
  //       value: { x: 0.2, y: 0.47, z: -0.2 },
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
  const [animationComplete, setAnimationComplete] = useState(false)

  useFrame(({ clock }) => {
    if (logo.current && !stopRotation) {
      const elapsedTime = clock.getElapsedTime()

      if (!animationComplete) {
        logo.current.position.z += (-2.6 - logo.current.position.z) * 0.03
        if (Math.abs(logo.current.position.z - -2.6) < 0.005) {
          logo.current.position.z = -2.6
          setAnimationComplete(true)
        }
      }

      logo.current.rotation.x = Math.sin(elapsedTime * Math.PI * 0.1)
    }
  })

  useGSAP(() => {
    // Animation for #landing_section-2
    tl.to(logo.current.rotation, {
      x: 0,
      scrollTrigger: {
        trigger: "#landing_section-2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        immediateRender: false,
      },
    })
      .to(logo.current.position, {
        z: -2.6,
        scrollTrigger: {
          trigger: "#landing_section-2",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          immediateRender: false,
        },
      })
      .to(scene.position, {
        x: -2.05,
        y: 1.75,
        z: -0.95,
        scrollTrigger: {
          trigger: "#landing_section-2",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          immediateRender: false,
          onEnter: () => {
            setStopRotation(true)
          },
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
          immediateRender: false,
        },
      })

      // Animation for #landing_section-4
      .to(scene.position, {
        x: 0.25,
        y: -0.2,
        z: -0.1,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-4",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          immediateRender: false,
        },
      })
      .to(scene.rotation, {
        x: 0.05,
        y: 0,
        z: 0,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-4",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          immediateRender: false,
        },
      })

      // Animation for #landing_section-5
      .to(scene.position, {
        x: 0.1,
        y: 0,
        z: -3.5,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-5",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          immediateRender: false,
        },
      })
      .to(scene.rotation, {
        x: 0,
        y: 0,
        z: 0,
        delay: 2,
        scrollTrigger: {
          trigger: "#landing_section-5",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
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
        intensity={15}
        color={`rgb(241, 222, 202)`}
      />
      <group
        {...props}
        dispose={null}
        ref={logo}
        position={[0, 0, -6]}
        rotation={[0, 0, 0]}
        scale={[2.2, 2.2, 0.1]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_1.geometry}
          material={nodes.Box_ext_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_2.geometry}
          material={nodes.Box_ext_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_3.geometry}
          material={nodes.Box_ext_3.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_4.geometry}
          material={nodes.Box_ext_4.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_5.geometry}
          material={nodes.Box_ext_5.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_6.geometry}
          material={nodes.Box_ext_6.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_7.geometry}
          material={nodes.Box_ext_7.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_8.geometry}
          material={nodes.Box_ext_8.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_9.geometry}
          material={nodes.Box_ext_9.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_10.geometry}
          material={nodes.Box_ext_10.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_11.geometry}
          material={nodes.Box_ext_11.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_12.geometry}
          material={nodes.Box_ext_12.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_13.geometry}
          material={nodes.Box_ext_13.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box_ext_14.geometry}
          material={nodes.Box_ext_14.material}
        />
      </group>
    </>
  )
}

useGLTF.preload("/Namilogo.glb")
