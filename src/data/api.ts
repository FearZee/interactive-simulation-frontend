import ky from "ky";

export const API_BASE_URL = "https://bs-api.plaesh.de";
// import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  headers: {
    "content-type": "application/json",
  },
  mode: "cors",
});
