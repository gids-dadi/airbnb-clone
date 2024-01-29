import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
export const handleAxios = axios.create({
  withCredentials: true,
});
