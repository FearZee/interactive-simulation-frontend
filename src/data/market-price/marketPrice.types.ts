export interface MarketPrice {
  day: number;
  reference: string;
  price: {
    [key: string]: number;
  };
}
