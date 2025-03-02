import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "http://localhost:3002/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosinstance;
