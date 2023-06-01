/** @format */

import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000", // API de Python
});

export default api;
