import { observer } from "mobx-react-lite";
import axios, { APIS } from "networking";
import { useEffect, useState } from "react";
import IStore from "store/instant.store";

const Sidebar = () => {
  let [locations, setLocations]: any = useState(null);
  let [craters, setCraters]: any = useState(null);

  const getLocations = async () => {
    let { data } = await axios.get(APIS.LOCATIONS.rawValue);
    setLocations(data);
  };

  const getCreaters = async () => {
    let { data } = await axios.get(APIS.CRATERS.rawValue);
    setCraters(data);
    console.log(data);
  };
  useEffect(() => {
    getLocations();
    getCreaters();
  }, []);

  if (IStore.locationIndex > -1)
    return (
      <div className="fixed left-[40px] top-0 w-[30%] h-full pt-[220px]">
        <div className="border-t border-white border-opacity-20 pt-2">
          <div className="text-sm text-gray-400">Longitude:</div>
          <div className="pl-2 text-2xl font-semibold">
            {Number(locations["Long"][IStore.locationIndex]).toFixed(3)}
          </div>
          <div className="text-sm text-gray-400">Latitude:</div>
          <div className="pl-2 text-2xl font-semibold">
            {Number(locations["Lat"][IStore.locationIndex]).toFixed(3)}
          </div>
          <div className="text-sm text-gray-400">Magnitude:</div>
          <div className="pl-2 text-2xl font-semibold">
            {Number(locations["Magnitude"][IStore.locationIndex]).toFixed(2)}
          </div>
          <div className="text-sm text-gray-400">Observation:</div>
          <div className="pl-2 text-2xl font-semibold">{IStore.locationIndex + 1}.</div>
          <div className="text-sm text-gray-400">Year:</div>
          <div className="pl-2 text-2xl font-semibold">
            {locations["Year"][IStore.locationIndex]}
          </div>
        </div>
      </div>
    );

  if (IStore.creterIndex > -1)
    return (
      <div className="fixed left-[40px] top-0 w-[30%] h-full pt-[220px]">
        <div className="border-t border-white border-opacity-20 pt-2">
          <div className="text-sm text-gray-400">Longitude:</div>
          <div className="pl-2 text-2xl font-semibold">
            {Number(craters["Center_Latitude"][IStore.creterIndex]).toFixed(3)}
          </div>
          <div className="text-sm text-gray-400">Latitude:</div>
          <div className="pl-2 text-2xl font-semibold">
            {Number(craters["Center_Latitude"][IStore.creterIndex]).toFixed(3)}
          </div>
          <div className="text-sm text-gray-400">Name:</div>
          <div className="pl-2 text-2xl font-semibold">
            {craters["Feature_Name"][IStore.creterIndex]}
          </div>
          <div className="text-sm text-gray-400">Last Updated:</div>
          <div className="pl-2 text-2xl font-semibold">
            {craters["Last_Updated"][IStore.creterIndex]}
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default observer(Sidebar);
