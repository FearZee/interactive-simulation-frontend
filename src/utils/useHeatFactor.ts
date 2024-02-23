import { useSimulationQuery } from "../data/simulation/simulation.queries.ts";
import {
  useControlledDevicesQuery,
  useScheduleQuery,
} from "../data/schedule/schedule.queries.ts";
import { useAtom } from "jotai/index";
import { userScheduleAtom } from "../state/userSchedule.ts";
import { v4 as uuid } from "uuid";

export const useHeatFactor = (simulationReference?: string) => {
  const { data: simulation, isLoading } =
    useSimulationQuery(simulationReference);
  const { data: scheduleData } = useScheduleQuery(
    simulation?.schedule_reference,
  );
  const { data: baseDevices } = useControlledDevicesQuery();
  const [userSchedule, setUserSchedule] = useAtom(userScheduleAtom);

  if (isLoading || !baseDevices || !scheduleData) {
    return null;
  }

  let heatFactor = scheduleData.heat_factor;

  const heatFactors = Array.from({ length: 24 }, (_, timeSlot) => {
    heatFactor -= 0.01;
    const heatPump = baseDevices.find(
      (baseDevice) => baseDevice.type === "heat-pump",
    );
    const heatPumpPlanned = userSchedule?.find((item) =>
      item.device.find(
        (device) =>
          device.base_device_reference === heatPump?.reference &&
          item.time_slot === timeSlot,
      ),
    );

    if (heatPumpPlanned) {
      const heatPumpDevice = heatPumpPlanned.device[0];
      const { duration } = heatPumpDevice;
      heatFactor += (0.2 * duration) / 60;
    }

    if (heatFactor < 0.9) {
      setUserSchedule((schedule) => {
        const foundIndex = schedule?.findIndex(
          (item) => item.time_slot === timeSlot,
        );
        const heatPumpDevice = baseDevices.find(
          (device) => device.type === "heat-pump",
        );

        if (!heatPumpDevice) {
          return schedule;
        }

        const heatPumpUserDevice = {
          reference: uuid(),
          base_device_reference: heatPumpDevice!.reference,
          duration: 60,
          wattage: heatPumpDevice!.wattage,
          name: heatPumpDevice!.name,
        };

        if (foundIndex !== undefined && schedule) {
          const updatedSchedule = schedule;
          const newDevice = heatPumpUserDevice;
          const found = schedule[foundIndex];
          if (
            found.device.find(
              (device) =>
                device.base_device_reference === heatPumpDevice!.reference,
            )
          ) {
            return schedule;
          }
          found.device.push(newDevice);
          console.log(found);
          updatedSchedule[foundIndex] = found;
          return updatedSchedule;
        }

        return [
          ...(schedule || []),
          {
            time_slot: timeSlot,
            device: [
              {
                ...heatPumpUserDevice,
              },
            ],
          },
        ];
      });
      heatFactor += 0.2;
    }

    return { timeSlot, heatFactor };
  });

  return heatFactors;
};
