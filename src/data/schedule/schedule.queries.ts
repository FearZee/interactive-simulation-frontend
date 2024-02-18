import { useQuery } from "@tanstack/react-query";
import { fetchSchedule } from "./schedule.api.ts";

export const useScheduleQuery = (scheduleReference?: string) =>
  useQuery({
    queryKey: ["schedule", scheduleReference],
    queryFn: () => {
      if (!scheduleReference) throw new Error("scheduleReference is required");
      return fetchSchedule(scheduleReference);
    },
  });
