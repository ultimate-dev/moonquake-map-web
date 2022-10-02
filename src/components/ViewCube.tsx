// @ts-nocheck
import { Scene, Matrix4 } from "three";
import { OrbitControls, OrthographicCamera, Stars, useCamera } from "@react-three/drei";

import { useEffect, useRef, useMemo, useState, forwardRef } from "react";
// Components
import Moon from "components/Moon";
import CordLines from "components/CordLines";
import { useFrame, useThree, createPortal } from "@react-three/fiber";
import axios, { APIS } from "networking";

const Viewcube = () => {
  const { gl, scene, camera, size } = useThree();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  const ref = useRef();
  const [hover, set] = useState(null);
  const matrix = new Matrix4();

  useFrame(() => {
    matrix.copy(camera.matrix).invert();
    ref.current.quaternion.setFromRotationMatrix(matrix);
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(virtualScene, virtualCam.current);
  }, 1);

  return createPortal(
    <>
      <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 100]} />
      <mesh
        ref={ref}
        raycast={useCamera(virtualCam)}
        position={[-(size.width / 2) + 120, size.height / 2 - 120, 0]}
        onPointerOut={(e) => set(null)}
        onPointerMove={(e) => set(Math.floor(e.faceIndex / 2))}
      >
        <meshBasicMaterial color="white" wireframe transparent opacity={0.2} />
        <boxGeometry args={[120, 120, 120]} />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </>,
    virtualScene
  );
};
export default Viewcube;
