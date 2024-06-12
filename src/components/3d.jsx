import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Loader,
} from "@react-three/drei";
import myimage from "../assets/ferrari_sf90_stradale.glb";
import thumb from "../assets/ferrarri.webp";

import { useSpring, a } from "@react-spring/three";

function Model(props) {
  const { scene } = useGLTF(myimage);
  const { onLoad } = props;

  useEffect(() => {
    // Traverse the scene to enable shadows and apply onLoad callback
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    if (onLoad) onLoad();
  }, [scene, onLoad]);

  return <primitive object={scene} {...props} />;
}
function AnimatedModel({ state, onLoad }) {
  const groupRef = useRef();
  const [animationDone, setAnimationDone] = React.useState(false);
  useEffect(() => {
    console.log(state);
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.y = 0;
    groupRef.current.rotation.z = 0;
  }, [state]);

  // Initial animation with react-spring
  const { scale, rotation } = useSpring({
    from: { scale: [0.6, 0.6, 0.6], rotation: [0, Math.PI / 10, 0] },
    to: async (next) => {
      await next({ scale: [1, 1, 1], rotation: [0, 0, 0] });
    },
    config: {
      duration: 800,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    },
  });

  // Use useFrame for continuous rotation after initial animation
  // useFrame(() => {
  //   if (groupRef.current) {
  //     // groupRef.current.rotation.y -= 0.002; // Continuous rotation speed
  //   }
  // });

  return (
    <a.group ref={groupRef} scale={scale} rotation={rotation}>
      <Model onLoad={onLoad} />
    </a.group>
  );
}

function Scene({ state, onLoad }) {
  const controlsRef = useRef();
  const { camera } = useThree();
  !state && camera.position.set(17, 1.6, 2);

  // Log the camera position on every frame
  useFrame(() => {
    const { x, y, z } = camera.position;
    // console.log(`Camera position: x=${x}, y=${y}, z=${z}`);
  });
  return (
    <>
      <Environment preset="park" />
      <pointLight position={[10, 10, 10]} />

      <ContactShadows
        position={[0, 0, 0.01]}
        opacity={0.5}
        scale={40}
        blur={1}
        far={10}
      />
      {/* Load and display the 3D model */}
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[13, 5, 11]} intensity={0.2} />
        <AnimatedModel state={state} onLoad={onLoad} />
        {/* <Model /> */}
      </Suspense>

      {/* Orbit controls for interaction */}
      <OrbitControls
        target={[0, 0, 1.2]}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 2.5}
        // minAzimuthAngle={-Math.PI / 2}
        // maxAzimuthAngle={Math.PI / 2}
        rotateSpeed={0.5}
        enablePan={false}
      />
    </>
  );
}

export default function Image3d({ state, onLoad }) {
  return (
    <>
      <Canvas
        id={`${state && "show"}`}
        shadows
        camera={{ position: [17, 1.6, 2], fov: 15 }}
        // camera={{ position: [13, 5, 11], fov: 10 }}
        // style={{ height: "150%" }}
      >
        <Scene state={state} onLoad={onLoad} />
      </Canvas>
    </>
  );
}
