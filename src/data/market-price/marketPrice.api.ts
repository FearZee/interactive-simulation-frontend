import { api } from "../api.ts";
import { MarketPrice } from "./marketPrice.types.ts";

export const fetchMarketPrice = (marketPriceReference: string) =>
  api.get(`pv/marketPrice/${marketPriceReference}`).json<MarketPrice>();
