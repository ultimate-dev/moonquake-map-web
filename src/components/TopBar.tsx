import IStore from "store/instant.store";
import Button from "./Button";
const TopBar = ({}) => {
  return (
    <div className="fixed flex flex-col justify-end top-0 right-0 z-50 p-5 w-26 h-full">
      <Button onClick={() => (IStore.wireframeStatus = !IStore.wireframeStatus)}>
        <i className="ri-ruler-2-fill" />
      </Button>
      <Button onClick={() => (IStore.cordLineStatus = !IStore.cordLineStatus)}>
        <i className="ri-compasses-fill" />
      </Button>
      <Button onClick={() => (IStore.helperStatus = !IStore.helperStatus)}>
        <i className="ri-grid-fill" />
      </Button>
      <Button onClick={() => (IStore.rotationStatus = !IStore.rotationStatus)}>
        <i className="ri-anticlockwise-fill" />
      </Button>
    </div>
  );
};
export default TopBar;
