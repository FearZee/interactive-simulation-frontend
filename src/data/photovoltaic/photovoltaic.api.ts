import { api } from "../api.ts";
import { Photovoltaic } from "./photovoltaic.types.ts";

export const fetchPhotovoltaic = (photovoltaicReference: string, day: number) =>
  api.get(`pv/${photovoltaicReference}/${day}`).json<Photovoltaic>();
