import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: "http://localhost:8080/api/",
  timeout: 10000,
  withCredentials: true,
  credentials: "same-origin",
});

export default instance;