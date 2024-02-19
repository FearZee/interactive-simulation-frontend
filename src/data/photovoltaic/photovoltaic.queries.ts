import { useQuery } from "@tanstack/react-query";
import { fetchBattery, fetchPhotovoltaic } from "./photovoltaic.api.ts";

export const usePhotovoltaicQuery = (
  day?: number,
  photovoltaicReference?: string,
) =>
  useQuery({
    queryKey: ["photovoltaic", photovoltaicReference],
    queryFn: () => {
      if (!photovoltaicReference || !day) {
        throw new Error("photovoltaicReference is required");
      }
      return fetchPhotovoltaic(photovoltaicReference, day);
    },
  });

export const useBatteryQuery = (batteryReference?: string) =>
  useQuery({
    queryKey: ["battery", batteryReference],
    queryFn: () => {
      if (!batteryReference) {
        throw new Error("batteryReference is required");
      }
      return fetchBattery(batteryReference);
    },
  });
