import { forwardRef, Fragment } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
// Textures
import MoonColorTexture from "assets/images/moon_color.jpeg";
import MoonUnitTexture from "assets/images/moon_unit.jpeg";

const Moon = forwardRef(({}, ref: any) => {
  const [colorMap, unitMap] = useLoader(TextureLoader, [MoonColorTexture, MoonUnitTexture]);
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[window.innerWidth / 600, 32, 32]} />
      <meshPhongMaterial map={colorMap} bumpMap={unitMap} bumpScale={0.3}  />
    </mesh>
  );
});

export default Moon;
