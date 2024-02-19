export interface Photovoltaic {
  reference: string;
  photovoltaic_reference: string;
  day: number;
  energy: {
    [key: string]: number;
  };
}

export interface Battery {
  charge: number;
  reference: string;
  capacity: number;
}
