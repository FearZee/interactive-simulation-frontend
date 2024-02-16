import ky from "ky";

export const API_BASE_URL = "http://127.0.0.1:8000";

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
});
