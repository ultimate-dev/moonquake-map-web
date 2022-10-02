import IStore from "store/instant.store";
import Button from "./Button";
const TopBar = ({}) => {
  return (
    <div className="fixed flex justify-end bottom-0 left-0 z-50 p-4 w-full">
      <Button onClick={() => (IStore.rotationStatus = !IStore.rotationStatus)}>Helper</Button>
    </div>
  );
};
export default TopBar;
