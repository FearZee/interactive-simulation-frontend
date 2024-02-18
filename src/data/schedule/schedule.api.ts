import { api } from "../api.ts";
import { ScheduleTypes } from "./schedule.types.ts";

export const fetchSchedule = (scheduleReference: string) =>
  api.get(`schedule/${scheduleReference}`).json<ScheduleTypes>();
