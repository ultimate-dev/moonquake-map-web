import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
const Pin = ({ position = [0, 0, 0], color }: any) => {

  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.02, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    
    </group>
  );
};
export default Pin;
