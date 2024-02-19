import { useQuery } from "@tanstack/react-query";
import {
  fetchControlledDevices,
  fetchSchedule,
  fetchScheduleDevices,
} from "./schedule.api.ts";

export const useScheduleQuery = (scheduleReference?: string) =>
  useQuery({
    queryKey: ["schedule", scheduleReference],
    queryFn: () => {
      if (!scheduleReference) throw new Error("scheduleReference is required");
      return fetchSchedule(scheduleReference);
    },
  });

export const useScheduleDevicesQuery = (scheduleReference?: string) =>
  useQuery({
    queryKey: ["schedule", scheduleReference, "devices"],
    queryFn: () => {
      if (!scheduleReference) throw new Error("scheduleReference is required");
      return fetchScheduleDevices(scheduleReference);
    },
  });

export const useControlledDevicesQuery = () =>
  useQuery({
    queryKey: ["controlledDevices"],
    queryFn: () => {
      return fetchControlledDevices();
    },
  });
