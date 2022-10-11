// @ts-nocheck
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";
// Components
import Moon from "components/Moon";
import CordLines from "components/CordLines";
import { useFrame, useThree, createPortal } from "@react-three/fiber";
import axios, { APIS } from "networking";
import { observer } from "mobx-react-lite";
import Pin from "components/Pin";
import IStore from "store/instant.store";
import Viewcube from "components/ViewCube";
import locationsData from "data/locations.json";
import centersData from "data/centers.json";
import cratersData from "data/craters.json";

function App() {
  const moonRef: any = useRef();
  const groupRef: any = useRef();
  const controlsRef: any = useRef();
  const lightRef: any = useRef();
  let [locations, setLocations] = useState(locationsData);
  let [craters, setCraters] = useState(cratersData);
  let [centers, setCenters] = useState(centersData);
  let { camera } = useThree();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (IStore.rotationStatus) {
      groupRef.current.rotation.y = elapsedTime / 20;
    }
    document.body.onkeyup = function (e) {
      if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        IStore.rotationStatus = !IStore.rotationStatus;
      }
    };
    lightRef.current.position.copy(camera.position);
    lightRef.current.rotation.copy(camera.rotation);

    controlsRef.current.update();
  });

  const getLocations = async () => {
    let { data } = await axios.get(APIS.LOCATIONS.rawValue);
    setLocations(data);
  };

  const getCreaters = async () => {
    let { data } = await axios.get(APIS.CRATERS.rawValue);
    setCraters(data);
  };

  const getCenters = async () => {
    let { data } = await axios.get(APIS.CENTERS.rawValue);
    setCenters(data);
  };
  useEffect(() => {
    //getLocations();
   // getCreaters();
    //getCenters();
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
      <group ref={lightRef}>
        <spotLight intensity={1} />
      </group>
      <group name="planetGroup" ref={groupRef} position={[0, 0, 0]}>
        <Moon ref={moonRef} wireframe={IStore.wireframeStatus} />
        {IStore.cordLineStatus && <CordLines />}
        {locations &&
          Object.values(locations["Year"])?.map((item, index) => {
            return (
              <Pin
                position={calcPosFromLatLonRad(
                  parseFloat(Object.values(locations["Lat"])[index]),
                  parseFloat(Object.values(locations["Long"])[index]),
                  window.innerWidth / 400
                )}
                color="red"
                onClick={() => {
                  IStore.creterIndex = -1;
                  IStore.locationIndex = index;
                }}
              />
            );
          })}

        {craters &&
          Object.values(craters["Feature_Name"])
            .filter((item, index) => Object.values(craters["Feature_Type_Code"])[index] == "AA")
            ?.map((item, index) => {
              return (
                <Pin
                  position={calcPosFromLatLonRad(
                    parseFloat(Object.values(craters["Center_Latitude"])[index]),
                    parseFloat(Object.values(craters["Center_Longitude"])[index]),
                    window.innerWidth / 400
                  )}
                  color="blue"
                  onClick={() => {
                    IStore.creterIndex = index;
                    IStore.locationIndex = -1;
                  }}
                />
              );
            })}

        {centers &&
          centers.map((item, index) => {
            return (
              <group
                position={calcPosFromLatLonRad(
                  parseFloat(item[0]),
                  parseFloat(item[1]),
                  window.innerWidth / 400
                )}
              >
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[1.1, 10, 10]} />
                  <meshBasicMaterial color="red" transparent opacity={0.1} />
                </mesh>
              </group>
            );
          })}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          onChange={(e) => {
            IStore.rotationStatus = false;
          }}
        />
        {IStore.helperStatus && (
          <>
            <gridHelper rotation={[0, 0, 0]} />
            <gridHelper rotation={[1.57, 0, 0]} />
          </>
        )}
      </group>

      <Viewcube />
    </>
  );
}

export default observer(App);
