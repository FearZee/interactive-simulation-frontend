import { useSimulationQuery } from "../data/simulation/simulation.queries.ts";
import {
  useControlledDevicesQuery,
  useScheduleQuery,
} from "../data/schedule/schedule.queries.ts";
import { useAtom } from "jotai/index";
import { userScheduleAtom } from "../state/userSchedule.ts";
import { v4 as uuid } from "uuid";

const HEAT_FACTOR_HOULY_EVOLUTION = 0.01;
const LOWER_HEAT_FACTOR = 0.4;
const HEATPUMP_HEAT_FACTOR = 0.2;

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
    heatFactor -= HEAT_FACTOR_HOULY_EVOLUTION;
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
      heatFactor += (HEATPUMP_HEAT_FACTOR * duration) / 60;
    }

    if (heatFactor < LOWER_HEAT_FACTOR) {
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
          return [
            ...schedule.filter((item) => item.time_slot !== timeSlot),
            {
              ...schedule[foundIndex],
              device: [...schedule[foundIndex].device, newDevice],
            },
          ];
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
      heatFactor += HEATPUMP_HEAT_FACTOR;
    }

    return { timeSlot, heatFactor };
  });

  return heatFactors;
};
