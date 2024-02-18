import { api } from "../api.ts";
import { Weather } from "./weather.types.ts";

export const fetchWeather = (weatherReference: string) =>
  api.get(`weather/${weatherReference}`).json<Weather>();
