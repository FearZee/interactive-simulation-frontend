export interface Photovoltaic {
  reference: string;
  photovoltaic_reference: string;
  day: number;
  energy: {
    [key: string]: number;
  };
}
