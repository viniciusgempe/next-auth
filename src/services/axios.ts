import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(cxt?: any) {
  const { "nextAuth.token": token } = parseCookies(cxt);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use((config) => {
    console.log(config);

    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
