import axios from "axios";

const api = axios.create({
  baseURL: "https://teenaturalsapi.onrender.com/api",
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("tn_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;