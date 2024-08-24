const isDev = import.meta.env.DEV;
const API_URL = !isDev ? import.meta.env.VITE_API_URL : "api";
const API_PLACE_URL = !isDev ? import.meta.env.VITE_API_PLACE_URL : "api";
const API = {
  API_URL,
  API_PLACE_URL,
};

export default API;
