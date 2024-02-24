import { atom, useAtom } from "jotai";

export interface UserSchedule {
  time_slot: number;
  device: UserScheduleDevice[] | [];
}

export interface UserScheduleDevice {
  reference: string;
  base_device_reference: string;
  duration: number;
  wattage: number;
  name: string;
}

export const userScheduleAtom = atom<UserSchedule[] | undefined>(undefined);

export const readUserScheduleAtom = atom((get) => get(userScheduleAtom));

export const useUserSchedule = (timeSlot: number) => {
  const [schedule] = useAtom(readUserScheduleAtom);
  return schedule?.find(({ time_slot }) => time_slot === timeSlot);
};
