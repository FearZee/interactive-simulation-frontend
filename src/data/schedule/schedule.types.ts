export interface ScheduleTypes {
  reference: string;
  heat_factor: number;
  complete: {
    [key: string]: {
      [key: string]: {
        duration: number;
        usage: number;
      };
    };
  };
  day: number;
}

export interface ScheduleDevice {
  time_slot: number;
  intensity?: string;
  schedule_reference: string;
  type: string;
  reference: string;
  duration: number;
  base_device: BaseDevice;
}

export interface BaseDevice {
  controllable: boolean;
  name: string;
  reference: string;
  type: string;
  wattage: number;
}
