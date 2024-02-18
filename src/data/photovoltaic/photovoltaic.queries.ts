import { useQuery } from "@tanstack/react-query";
import { fetchPhotovoltaic } from "./photovoltaic.api.ts";

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
