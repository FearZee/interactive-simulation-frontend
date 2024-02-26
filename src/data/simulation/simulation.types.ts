export interface Simulation {
  reference: string;
  day: number;
  energy_market_reference: string;
  battery_reference: string;
  photovoltaic_reference: string;
  weather_reference: string;
  schedule_reference: string;
}

export interface Tip {
  [key: string]: {
    message: string;
    devices: TipWithDevice[];
  };
}

export interface TipWithDevice {
  device: {
    name: string;
    reference: string;
    type: string;
  };
  message: string;
}
