import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./weather.api.ts";

export const useWeatherQuery = (weatherReference?: string) =>
  useQuery({
    queryKey: ["weather", weatherReference],
    queryFn: () => {
      if (!weatherReference) throw new Error("Weather reference is required");
      return fetchWeather(weatherReference);
    },
  });
