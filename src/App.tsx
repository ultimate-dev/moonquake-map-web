// @ts-nocheck
import { OrbitControls, Stars, PerspectiveCamera, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
// Components
import Moon from "components/Moon";
import CordLines from "components/CordLines";
import { useFrame } from "@react-three/fiber";

function App() {
  const moonRef: any = useRef();
  const groupRef: any = useRef();
  const controlsRef: any = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsedTime / 12;
    controlsRef.current.update();
  });

  return (
    <>
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} />
      <ambientLight color="#f6f3ea" position={[0, 0, 0]} intensity={0.8} />
      <group name="planetGroup" ref={groupRef} position={[0, 0, 0]}>
        <Moon ref={moonRef} />
        <CordLines />
      </group>
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
        maxZoom={10}
      />
      <gridHelper rotation={[0, 0, 0]} />
      <gridHelper rotation={[1.57, 0, 0]} />
    </>
  );
}

export default App;
