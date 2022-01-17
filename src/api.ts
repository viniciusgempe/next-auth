import { parseCookies } from "nookies";
import axios from "axios";

const { "nextAuth.token": token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  console.log(config);

  return config;
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
