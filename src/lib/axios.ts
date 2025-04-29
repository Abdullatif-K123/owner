import ax from "axios";
import { API_BASE_URL } from "../constants/domain";
import { storage } from "../utils/storage";

// let token = storage.getToken();
const axios = ax.create({
  baseURL: API_BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${storage.getToken()}`;
    config.headers["Accept-Language"] = "ar";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// window.addEventListener("tokenChanged", () => {
//   token = storage.getToken();
// });
axios.interceptors.response.use((res) => {
  if (res.status === 401) {
    storage.clearToken();
  }
  return res;
});

export default axios;
