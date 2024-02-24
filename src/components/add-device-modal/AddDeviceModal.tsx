import { useControlledDevicesQuery } from "../../data/schedule/schedule.queries.ts";
import { Button, LoadingOverlay, Modal, Select } from "@mantine/core";
import { FC, useState } from "react";
import { BaseDevice } from "../../data/schedule/schedule.types.ts";
import { useAtom } from "jotai";
import { userScheduleAtom } from "../../state/userSchedule.ts";
import { v4 as uuidv4 } from "uuid";

interface AddDeviceModalProps {
  timeSlot: number;
  opened: boolean;
  onClose: () => void;
  leftEnergy: number;
}

const leftEnergyDevices = [
  {
    reference: "b103c446-078a-4561-b3c8-85865b6b7f50",
    name: "Battery",
    capacity: 10.0,
    current: 4.0,
  },
  {
    reference: "30c45c30-a16c-4f53-afed-fce423f5df4d",
    name: "Energy market",
  },
];

export const AddDeviceModal: FC<AddDeviceModalProps> = ({
  timeSlot,
  opened,
  onClose,
  leftEnergy,
}) => {
  const { data: baseDevices, isLoading } = useControlledDevicesQuery();
  const [selectedDevice, setSelected] = useState<
    BaseDevice | { reference: string; [key: string]: any } | undefined
  >(undefined);
  const [duration, setDuration] = useState<number | null>(null);

  const [, setUserSchedule] = useAtom(userScheduleAtom);

  if (isLoading || !baseDevices) {
    return <LoadingOverlay />;
  }

  const options = baseDevices.reduce(
    (acc: { value: string; label: string }[], device) => {
      acc.push({ label: device.name, value: device.reference });
      return acc;
    },
    [],
  );

  const handleSelect = (value: string | null) => {
    const tempDevices = [...baseDevices, ...leftEnergyDevices];
    setSelected(tempDevices.find((device) => device.reference === value));
  };

  const timeOptions = Array.from({ length: 12 }, (_, i) =>
    ((i + 1) * 5).toString(),
  );

  const handleAddDevice = () => {
    if (selectedDevice) {
      setUserSchedule((schedule) => {
        const foundIndex =
          schedule?.findIndex((item) => item.time_slot === timeSlot) || -1;

        if (foundIndex !== -1 && schedule) {
          const updatedSchedule = schedule;
          const newDevice = {
            reference: uuidv4(),
            base_device_reference: selectedDevice.reference,
            duration: duration || 60,
            wattage: selectedDevice.wattage || leftEnergy * 1000,
            name: selectedDevice.name,
          };
          const found = schedule[foundIndex];
          found.device.push(newDevice);
          console.log(found);
          updatedSchedule[foundIndex] = found;
          return [
            ...schedule,
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
                reference: uuidv4(),
                base_device_reference: selectedDevice.reference,
                duration: duration || 60,
                wattage: selectedDevice.wattage || leftEnergy * 1000,
                name: selectedDevice.name,
              },
            ],
          },
        ];
      });
    }

    onClose();
  };

  const renderModalBody = () => {
    if (!selectedDevice) return <p>Select a device</p>;

    if (
      leftEnergyDevices.find(
        ({ reference }) => reference === selectedDevice.reference,
      )
    ) {
      return <p>Device is not available</p>;
    }

    return (
      <>
        <p>{selectedDevice?.wattage} kWh</p>
        <Select
          label={"Duration"}
          step={5}
          data={timeOptions}
          value={duration?.toString()}
          onChange={(value) => setDuration(Number(value))}
        />
        <p>
          {selectedDevice &&
            duration &&
            ((selectedDevice?.wattage / 1000) * (duration / 60)).toFixed(
              3,
            )}{" "}
          kWh
        </p>
      </>
    );
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Device" centered>
      <Select
        label={"Device"}
        data={[
          ...options,
          ...leftEnergyDevices.map((device) => ({
            label: device.name,
            value: device.reference,
          })),
        ]}
        value={selectedDevice?.reference}
        onChange={(value) => handleSelect(value)}
      />
      {renderModalBody()}
      <Button autoContrast onClick={handleAddDevice}>
        Add Device
      </Button>
    </Modal>
  );
};
