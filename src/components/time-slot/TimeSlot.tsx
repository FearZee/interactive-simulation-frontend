import { Button, Card, Flex, Space, Stack, Text } from "@mantine/core";
import { FC, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ScheduleDevice } from "../../data/schedule/schedule.types.ts";
import { AddDeviceModal } from "../add-device-modal/AddDeviceModal.tsx";

interface TimeSlotProps {
  time: string;
  onSelect: (selected: string) => void;
  devices: ScheduleDevice[];
  pvOutput: number;
  marketPrice: number;
}

export const TimeSlot: FC<TimeSlotProps> = ({
  time,
  onSelect,
  devices,
  pvOutput,
  marketPrice,
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { output, energyPrice, usage } = {
    output: pvOutput,
    energyPrice: marketPrice,
    usage: devices.reduce(
      (acc, val) =>
        acc + ((val.base_device.wattage / 1000) * val.duration) / 60,
      0,
    ),
  };
  const leftEnergy = output - usage;
  const formattedHour = time.padStart(2, "0");
  const timeString = `${formattedHour}:00`;

  return (
    <>
      <AddDeviceModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
      <Card bg={"#fff"}>
        <Text>{timeString}</Text>
        <Space h={"md"} />
        <Flex w={"100%"} gap={"md"}>
          <Stack gap={"sm"} w={100}>
            <Text fz={"xs"}>
              PV Outage: <br />
              {output.toFixed(2)} kWh
            </Text>
            <Text fz={"xs"}>
              Energy price: <br />
              {energyPrice.toFixed(2)} cent
            </Text>
            <Text fz={"xs"}>
              Usage: <br />
              {usage.toFixed(3)} kWh
            </Text>
            <Text fz={"xs"}>
              Battery: <br />
              {4.0} kWh
            </Text>
            <Text fz={"xs"}>
              Left energy: <br />
              {leftEnergy.toFixed(2)} kWh
            </Text>
          </Stack>
          <Flex gap={"md"} wrap={"wrap"} w={"100%"}>
            {devices.map((device) => (
              <DeviceCard
                key={device.reference}
                deviceName={device.base_device.name}
                duration={device.duration}
                usage={
                  (device.base_device.wattage / 1000) * (device.duration / 60)
                }
                onClick={device.base_device.controllable ? onSelect : undefined}
              />
            ))}
            <Button
              w={300}
              h={150}
              variant="light"
              color="rgba(191, 191, 191, 1)"
              p={0}
              m={0}
              onClick={() => setModalOpened(true)}
            >
              <Flex justify={"center"} align={"center"} h={"100%"}>
                <IconPlus />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

interface DeviceCardProps {
  deviceName: string;
  duration: number;
  usage: number;
  onClick?: (deviceName: string) => void;
}

const DeviceCard: FC<DeviceCardProps> = ({
  deviceName,
  duration,
  usage,
  onClick,
}) => {
  return (
    <Card h={150} w={300} onClick={() => onClick?.(deviceName)}>
      <Text>{deviceName}</Text>
      <Space h={"sm"} />
      <Text>In use for: {duration} minutes</Text>
      <Text>Usage: {usage} kWh</Text>
    </Card>
  );
};
