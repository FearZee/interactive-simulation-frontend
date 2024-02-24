import { Button, Card, Flex, Space, Stack, Text } from "@mantine/core";
import { FC, useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { ScheduleDevice } from "../../data/schedule/schedule.types.ts";
import { AddDeviceModal } from "../add-device-modal/AddDeviceModal.tsx";
import {
  readUserScheduleAtom,
  userScheduleAtom,
  UserScheduleDevice,
  useUserSchedule,
} from "../../state/userSchedule.ts";
import { randomId } from "@mantine/hooks";
import { useAtom } from "jotai";

interface TimeSlotProps {
  time: number;
  onSelect: (selected: UserScheduleDevice) => void;
  devices?: ScheduleDevice[];
  pvOutput: number;
  marketPrice: number;
  batteryStorage: number;
  heatFactor: number;
}

export const TimeSlot: FC<TimeSlotProps> = ({
  time,
  onSelect,
  devices,
  pvOutput,
  marketPrice,
  batteryStorage,
  heatFactor,
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const userDevices = useUserSchedule(Number(time));
  const [, setUserSchedule] = useAtom(userScheduleAtom);

  const { output, energyPrice } = {
    output: pvOutput,
    energyPrice: marketPrice,
  };

  const usage =
    (devices
      ? devices.reduce(
          (acc, val) =>
            acc + ((val.base_device.wattage / 1000) * val.duration) / 60,
          0,
        )
      : 0) +
    (userDevices
      ? userDevices.device.reduce(
          (acc, val) => acc + (val.wattage / 1000) * (val.duration / 60),
          0,
        )
      : 0);

  const leftEnergy = output - usage;
  const formattedHour = time.toString().padStart(2, "0");
  const timeString = `${formattedHour}:00`;

  const handleRemove = (deviceReference: string) => {
    setUserSchedule((schedule) => [
      ...(schedule ?? []).map((entry) => {
        const updatedDevices = [
          ...entry.device.filter(
            (device) => device.reference !== deviceReference,
          ),
        ];

        return {
          time_slot: entry.time_slot,
          device: updatedDevices,
        };
      }),
    ]);
  };

  return (
    <>
      <AddDeviceModal
        timeSlot={Number(time)}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        leftEnergy={leftEnergy}
      />
      <Card bg={"#fff"}>
        <Text>{timeString}</Text>
        <Space h={"md"} />
        <Flex w={"100%"} gap={"md"}>
          <Stack gap={"sm"} w={100}>
            <Text fz={"xs"}>
              PV Outage: <br />
              {output.toFixed(3)} kWh
            </Text>
            <Text fz={"xs"}>
              Usage: <br />
              {usage.toFixed(3)} kWh
            </Text>
            <Text fz={"xs"}>
              Battery: <br />
              {batteryStorage.toFixed(3)} kWh
            </Text>
            <Text fz={"xs"}>
              Heat Factor: <br />
              {heatFactor.toFixed(1)} %
            </Text>
            <Text fz={"xs"}>
              Energy price: <br />
              {energyPrice.toFixed(2)} cent
            </Text>
            {false && (
              <Text fz={"xs"}>
                Left energy: <br />
                {leftEnergy.toFixed(3)} kWh
              </Text>
            )}
          </Stack>
          <Flex gap={"md"} wrap={"wrap"} w={"100%"}>
            {devices?.map((device) => (
              <DeviceCard
                key={randomId()}
                // key={device.reference}
                deviceName={device.base_device.name}
                duration={device.duration}
                usage={
                  (device.base_device.wattage / 1000) * (device.duration / 60)
                }
              />
            ))}
            {userDevices?.device.map((device) => (
              <DeviceCard
                key={randomId()}
                reference={device.reference}
                deviceName={device.name}
                duration={device.duration}
                usage={(device.wattage / 1000) * (device.duration / 60)}
                onClick={onSelect}
                onRemove={() => handleRemove(device.reference)}
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
  onClick?: (device: UserScheduleDevice) => void;
  onRemove?: () => void;
  reference?: string;
}

const DeviceCard: FC<DeviceCardProps> = ({
  deviceName,
  duration,
  usage,
  onClick,
  onRemove,
  reference,
}) => {
  const [userDevices] = useAtom(readUserScheduleAtom);

  const thisDevice = userDevices?.map((device) =>
    device.device.find((item) => item.reference === reference),
  )[0];

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <Card
      h={150}
      w={300}
      onClick={() => onClick?.(thisDevice!)}
      bg={onClick && "magenta.2"}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Text>{deviceName}</Text>
        {onRemove && (
          <Button
            variant={"transparent"}
            c={"black"}
            onClick={handleRemoveClick}
          >
            <IconMinus />
          </Button>
        )}
      </Flex>
      <Space h={"sm"} />
      <Text>In use for: {duration} minutes</Text>
      <Text>Usage: {usage.toFixed(3)} kWh</Text>
    </Card>
  );
};
