import { makeAutoObservable, configure } from "mobx";
import { create, persist } from "mobx-persist";

configure({ enforceActions: "never" });

class MainStoreC {
  @persist token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  // Token
  setToken = (token: string) => {
    this.token = token;
  };
  clearToken = () => (this.token = null);
}

const hydrate = create({});

const MStore = new MainStoreC();

hydrate("MainStore", MStore).then(() => {
  console.log("MainStore hydrated");
});

export default MStore;
