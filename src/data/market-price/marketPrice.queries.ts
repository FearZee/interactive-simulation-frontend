import { useQuery } from "@tanstack/react-query";
import { fetchMarketPrice } from "./marketPrice.api.ts";

export const useMarketPriceQueries = (marketPriceReference?: string) =>
  useQuery({
    queryKey: ["marketPrice", marketPriceReference],
    queryFn: () => {
      if (!marketPriceReference) {
        return Promise.resolve(null);
      }
      return fetchMarketPrice(marketPriceReference);
    },
  });
