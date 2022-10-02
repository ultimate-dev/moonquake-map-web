const Pin = ({ position = [0, 0, 0], color, onClick }: any) => {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]} onPointerDown={onClick}>
        <sphereGeometry args={[0.02, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
export default Pin;
