import { Button, Card, Flex, Space, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { IconPlus } from "@tabler/icons-react";

interface TimeSlotProps {
  time: string;
  onSelect: (selected: string) => void;
}

export const TimeSlot: FC<TimeSlotProps> = ({ time, onSelect }) => {
  const { output, energyPrice, usage } = {
    output: 5,
    energyPrice: 22.4,
    usage: 2.6,
  };
  return (
    <Card bg={"#fff"}>
      <Text>{time}</Text>
      <Space h={"md"} />
      <Flex gap={"md"}>
        <Stack gap={"sm"} w={120}>
          <Text fz={"xs"}>
            PV Outage: <br />
            {output} kWh
          </Text>
          <Text fz={"xs"}>
            Energy price: <br />
            {energyPrice} cent
          </Text>
          <Text fz={"xs"}>
            Usage: <br />
            {usage} kWh
          </Text>
        </Stack>
        <Flex gap={"md"} wrap={"wrap"}>
          <DeviceCard
            deviceName="Heat Pump"
            duration={30}
            usage={2}
            onClick={onSelect}
          />
          <DeviceCard
            deviceName="Washing Machine"
            duration={10}
            usage={0.6}
            onClick={onSelect}
          />
          <DeviceCard
            deviceName="Washing Machine"
            duration={10}
            usage={0.6}
            onClick={onSelect}
          />
          <DeviceCard
            deviceName="Washing Machine"
            duration={10}
            usage={0.6}
            onClick={onSelect}
          />
          <Button
            w={300}
            h={150}
            variant="light"
            color="rgba(191, 191, 191, 1)"
          >
            <Flex justify={"center"} align={"center"} h={"100%"}>
              <IconPlus />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

interface DeviceCardProps {
  deviceName: string;
  duration: number;
  usage: number;
  onClick: (deviceName: string) => void;
}

const DeviceCard: FC<DeviceCardProps> = ({
  deviceName,
  duration,
  usage,
  onClick,
}) => {
  return (
    <Card h={150} w={300} onClick={() => onClick(deviceName)}>
      <Text>{deviceName}</Text>
      <Space h={"sm"} />
      <Text>In use for: {duration} minutes</Text>
      <Text>Usage: {usage} kWh</Text>
    </Card>
  );
};
