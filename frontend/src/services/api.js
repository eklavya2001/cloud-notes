import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-notebook-qnnx.onrender.com",
  withCredentials: true,
});

export default api;
