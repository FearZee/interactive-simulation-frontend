import { Button, Card, Flex, Space, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { IconPlus } from "@tabler/icons-react";

interface TimeSlotProps {
  time: string;
}

export const TimeSlot: FC<TimeSlotProps> = ({ time }) => {
  return (
    <Card bg={"#fff"}>
      <Text>{time}</Text>
      <Space h={"md"} />
      <Flex gap={"md"}>
        <Stack gap={"sm"} w={120}>
          <Text fz={"sm"}>
            PV Outage: <br />5 kWh
          </Text>
          <Text fz={"sm"}>
            Energy price: <br />
            22.4 cent
          </Text>
          <Text fz={"sm"}>
            Usage: <br />
            2.6 kWh
          </Text>
        </Stack>
        <Flex gap={"md"} wrap={"wrap"}>
          <DeviceCard deviceName="Heat Pump" duration={30} usage={2} />
          <DeviceCard deviceName="Washing Machine" duration={10} usage={0.6} />
          <DeviceCard deviceName="Washing Machine" duration={10} usage={0.6} />
          <DeviceCard deviceName="Washing Machine" duration={10} usage={0.6} />
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
}

const DeviceCard: FC<DeviceCardProps> = ({ deviceName, duration, usage }) => {
  return (
    <Card h={150} w={300}>
      <Text>{deviceName}</Text>
      <Text>In use for: {duration} minutes</Text>
      <Text>Usage: {usage} kWh</Text>
    </Card>
  );
};
