const isDev = import.meta.env.PROD;
const API_URL = !isDev ? import.meta.env.VITE_API_URL : "api";
const API_PLACE_URL = !isDev ? import.meta.env.VITE_API_PLACE_URL : "api";
// const API_URL = import.meta.env.VITE_API_URL;
// const API_PLACE_URL = import.meta.env.VITE_API_PLACE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API = {
  API_URL,
  API_PLACE_URL,
  API_KEY,
};

export default API;
