const CordLines = () => {
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[10, 0.01, 0.01]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.01, 10, 0.01]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.01, 0.01, 10]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </>
  );
};
export default CordLines;
