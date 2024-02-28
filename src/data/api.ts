import ky from "ky";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://bs-api.plaesh.de";

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  headers: {
    "Content-type": "application/json",
  },
  mode: "cors",
});
