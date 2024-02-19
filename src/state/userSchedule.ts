import { atom, useAtom } from "jotai";

interface UserSchedule {
  time_slot: number;
  device: {
    base_device_reference: string;
    duration: number;
    wattage: number;
    name: string;
  }[];
}

export const userScheduleAtom = atom<UserSchedule[] | undefined>(undefined);

const readOnlyAtom = atom((get) => get(userScheduleAtom));

export const useUserSchedule = (timeSlot: number) => {
  const [schedule] = useAtom(readOnlyAtom);
  return schedule?.find(({ time_slot }) => time_slot === timeSlot);
};
