import { API_URL } from "constants/configs";
import ax from "axios";
// APIS
import APIS from "./API";

const axios = ax.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config: any) => {
    // config.headers.common["authorization"] = `Bearer ${MStore.token}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export { APIS };
export default axios;
