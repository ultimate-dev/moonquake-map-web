import { makeAutoObservable, configure } from "mobx";
import { create, persist } from "mobx-persist";

configure({ enforceActions: "never" });

class MainStoreC {
  constructor() {
    makeAutoObservable(this);
  }
}

const hydrate = create({});

const MStore = new MainStoreC();

hydrate("MainStore", MStore).then(() => {
  console.log("MainStore hydrated");
});

export default MStore;
