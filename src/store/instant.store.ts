import _ from "lodash";
import { makeAutoObservable, configure } from "mobx";

configure({ enforceActions: "never" });

class InstantStoreC {
  loading: string[] = [];
  cordLineStatus: boolean = false;
  helperStatus: boolean = false;
  wireframeStatus: boolean = false;
  rotationStatus: boolean = true;

  locationIndex: number = -1;
  creterIndex: number = -1;

  constructor() {
    makeAutoObservable(this);
  }
  // Loading
  showLoading = (id: string) => (this.loading = _.uniqBy([...this.loading, id], (e) => e));
  hideLoading = (id: string) => (this.loading = this.loading.filter((e) => e !== id));
}

const IStore = new InstantStoreC();

export default IStore;
