const Pin = ({ position = [0, 0, 0] }: any) => {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.02, 10, 10]} />
        <meshBasicMaterial color="red" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
export default Pin;
