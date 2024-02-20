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
    const userDevice = userSchedule?.find(
      (item) => item.time_slot === timeSlot,
    );

    const devices = scheduleDevices.filter(
      (item) => item.time_slot === timeSlot,
    );

    const output = outputPV.energy[timeSlot];

    const usage =
      devices.reduce(
        (acc, val) =>
          acc + ((val.base_device.wattage / 1000) * val.duration) / 60,
        0,
      ) +
      (userDevice
        ? userDevice.device.reduce(
            (acc, val) => acc + (val.wattage / 1000) * (val.duration / 60),
            0,
          )
        : 0);

    const leftEnergy = output - usage;

    const batteryDevice = userDevice?.device.find(
      (item) => item.name === "Battery",
    );

    if (leftEnergy < 0) {
      batteryStorage += leftEnergy;
    }

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
