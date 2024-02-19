import { api } from "../api.ts";
import { Battery, Photovoltaic } from "./photovoltaic.types.ts";

export const fetchPhotovoltaic = (photovoltaicReference: string, day: number) =>
  api.get(`pv/${photovoltaicReference}/${day}`).json<Photovoltaic>();

export const fetchBattery = (batteryReference: string) =>
  api.get(`pv/battery/${batteryReference}`).json<Battery>();
