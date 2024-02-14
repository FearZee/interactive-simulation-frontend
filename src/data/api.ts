import ky from "ky";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  mode: "cors",
  redirect: "follow",
  retry: { statusCodes: [408, 502, 503, 504] },
  timeout: 30000,
});
