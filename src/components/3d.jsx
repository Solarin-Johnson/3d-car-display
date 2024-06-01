import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Loader,
} from "@react-three/drei";
import myimage from "../assets/ferrari_sf90_stradale.glb";
import { useSpring, a } from "@react-spring/three";

function Model(props) {
  const { scene } = useGLTF(myimage);

  // Enable shadows for the model
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      // console.log(child.name);
      // child.material.roughness = 0; // Adjust roughness
      // child.material.metalness = 0;
    }
  });

  return <primitive object={scene} {...props} />;
}
function AnimatedModel(props) {
  const groupRef = useRef();
  const [animationDone, setAnimationDone] = React.useState(false);

  // Initial animation with react-spring
  const { scale, rotation } = useSpring({
    from: { scale: [0.1, 0.1, 0.1], rotation: [0, 0, 0] },
    to: async (next) => {
      await next({ scale: [1, 1, 1], rotation: [0, Math.PI / 4, 0] });
      setAnimationDone(true); // Indicate the animation is done
    },
    config: { tension: 280, friction: 60, duration: 1000 },
  });

  // Use useFrame for continuous rotation after initial animation
  useFrame(() => {
    if (animationDone && groupRef.current) {
      groupRef.current.rotation.y += 0.002; // Continuous rotation speed
    }
  });

  return (
    <a.group ref={groupRef} scale={scale} rotation={rotation}>
      <Model {...props} />
    </a.group>
  );
}

function Scene() {
  const controlsRef = useRef();
  const { camera } = useThree();

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
        {/* <AnimatedModel /> */}
        <Model />
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

export default function Image3d() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [17, 1.6, 2], fov: 15 }}
        // camera={{ position: [13, 5, 11], fov: 15 }}
        style={{ height: "150%" }}
      >
        <Scene />
      </Canvas>
      <Loader />
    </>
  );
}
