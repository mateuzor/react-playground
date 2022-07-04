import axios from "axios";

const api = axios.create({
  baseURL: "https://mocki.io/v1/",
});

export default api;
