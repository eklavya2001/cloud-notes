import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-notes-ycsk.onrender.com",
  withCredentials: true,
});

export default api;
