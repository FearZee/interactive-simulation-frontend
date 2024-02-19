import { api } from "../api.ts";
import { BaseDevice, ScheduleDevice, ScheduleTypes } from "./schedule.types.ts";

export const fetchSchedule = (scheduleReference: string) =>
  api.get(`schedule/${scheduleReference}`).json<ScheduleTypes>();

export const fetchScheduleDevices = (scheduleReference: string) =>
  api.get(`schedule/${scheduleReference}/devices`).json<ScheduleDevice[]>();

export const fetchControlledDevices = () =>
  api.get("schedule/controlled_devices").json<BaseDevice[]>();
