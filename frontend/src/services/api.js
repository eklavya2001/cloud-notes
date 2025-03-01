import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-notes-backend-jzd4.onrender.com",
  withCredentials: true,
});

export default api;
