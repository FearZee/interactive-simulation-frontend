import { useControlledDevicesQuery } from "../../data/schedule/schedule.queries.ts";
import { Button, LoadingOverlay, Modal, Select } from "@mantine/core";
import { FC, useState } from "react";
import { BaseDevice } from "../../data/schedule/schedule.types.ts";
import { useAtom } from "jotai";
import { userScheduleAtom } from "../../state/userSchedule.ts";

interface AddDeviceModalProps {
  timeSlot: number;
  opened: boolean;
  onClose: () => void;
}

export const AddDeviceModal: FC<AddDeviceModalProps> = ({
  timeSlot,
  opened,
  onClose,
}) => {
  const { data: baseDevices, isLoading } = useControlledDevicesQuery();
  const [selectedDevice, setSelected] = useState<BaseDevice | undefined>(
    undefined,
  );
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
    setSelected(baseDevices.find((device) => device.reference === value));
  };

  const timeOptions = Array.from({ length: 12 }, (_, i) =>
    ((i + 1) * 5).toString(),
  );

  const handleAddDevice = () => {
    if (selectedDevice && duration) {
      setUserSchedule((schedule) => {
        const found = schedule?.find((item) => item.time_slot === timeSlot);
        if (found) {
          found.device.push({
            base_device_reference: selectedDevice.reference,
            duration: duration,
            wattage: selectedDevice.wattage,
            name: selectedDevice.name,
          });
          return [...schedule!, found];
        }
        return [
          ...(schedule || []),
          {
            time_slot: timeSlot,
            device: [
              {
                base_device_reference: selectedDevice.reference,
                duration: duration,
                wattage: selectedDevice.wattage,
                name: selectedDevice.name,
              },
            ],
          },
        ];
      });
    }

    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Device" centered>
      <Select
        label={"Device"}
        data={options}
        value={selectedDevice?.reference}
        onChange={(value) => handleSelect(value)}
      />
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
          ((selectedDevice?.wattage / 1000) * (duration / 60)).toFixed(3)}{" "}
        kWh
      </p>
      <Button autoContrast onClick={handleAddDevice}>
        Add Device
      </Button>
    </Modal>
  );
};
