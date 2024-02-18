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
