import {
  useBatteryQuery,
  usePhotovoltaicQuery,
} from "../data/photovoltaic/photovoltaic.queries.ts";
import { useSimulationQuery } from "../data/simulation/simulation.queries.ts";
import { useScheduleDevicesQuery } from "../data/schedule/schedule.queries.ts";
import { useAtom } from "jotai/index";
import { userScheduleAtom } from "../state/userSchedule.ts";

export const useBattery = (simulationReference?: string) => {
  const { data: simulation, isLoading } =
    useSimulationQuery(simulationReference);
  const { data: scheduleDevices } = useScheduleDevicesQuery(
    simulation?.schedule_reference,
  );
  const { data: outputPV } = usePhotovoltaicQuery(
    simulation?.day,
    simulation?.photovoltaic_reference,
  );
  const { data: battery } = useBatteryQuery(simulation?.battery_reference);
  const [userSchedule] = useAtom(userScheduleAtom);

  if (isLoading || !battery || !outputPV || !scheduleDevices) {
    return null;
  }

  let batteryStorage = battery.capacity * battery.charge;

  return [...Array(24).keys()].map((timeSlot) => {
    const userDevices = userSchedule?.find(
      (item) => item.time_slot === timeSlot,
    );

    const batteryDevice = userDevices?.device.find(
      (item) => item.name === "Battery",
    );

    if (batteryDevice) {
      batteryStorage += batteryDevice.wattage / 1000;

      if (batteryStorage > battery.capacity) {
        batteryStorage = battery.capacity;
      }
    }

    return {
      timeSlot,
      batteryStorage,
    };
  });
};
