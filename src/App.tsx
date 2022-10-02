// @ts-nocheck
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
// Components
import Moon from "components/Moon";
import CordLines from "components/CordLines";
import { useFrame } from "@react-three/fiber";
import axios, { APIS } from "networking";
import IStore from "store/instant.store";
import { observer } from "mobx-react-lite";
import Pin from "components/Pin";

function App() {
  const moonRef: any = useRef();
  const groupRef: any = useRef();
  const controlsRef: any = useRef();
  let [data, setData] = useState(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsedTime / 12;
    controlsRef.current.update();
  });

  const getData = async () => {
    let { data } = await axios.get(APIS.DATA.rawValue);
    setData(data);
    Object.values(data["Year"]).map((item, index) => {
      console.log(Object.values(data["Long"]), Object.values(data["Lat"]));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  function calcPosFromLatLonRad(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);

    let x = -(radius * Math.sin(phi) * Math.cos(theta));
    let z = radius * Math.sin(phi) * Math.sin(theta);
    let y = radius * Math.cos(phi);

    return [x, y, z];
  }

  return (
    <>
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} />
      <ambientLight color="#f6f3ea" position={[0, 0, 0]} intensity={0.8} />
      <group name="planetGroup" ref={groupRef} position={[0, 0, 0]}>
        <Moon ref={moonRef} />
        <CordLines />
        {data &&
          Object.values(data["Year"])?.map((item, index) => {
            return (
              <Pin
                position={calcPosFromLatLonRad(
                  parseFloat(Object.values(data["Lat"])[index]),
                  parseFloat(Object.values(data["Long"])[index]),
                  window.innerWidth / 600
                )}
              />
            );
          })}
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

export default observer(App);
