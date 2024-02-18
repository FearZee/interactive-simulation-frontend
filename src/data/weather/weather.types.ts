export interface Weather {
  reference: string;
  day: number;
  weather: {
    [key: string]: {
      wind: number;
      sun: number;
      cloud: number;
      temperature: number;
    };
  };
}
