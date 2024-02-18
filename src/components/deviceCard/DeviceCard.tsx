import { Button, Card, Flex, Select, Stack, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FC } from "react";

interface DeviceCardProps {
  onClose: () => void;
}

// TODO: Add props to add interactivity
export const DeviceCard: FC<DeviceCardProps> = ({ onClose }) => {
  return (
    <Card
      bg={"#fff"}
      w={400}
      shadow={"0 4px 16px rgba(0,0,0,0.25)"}
      style={{ position: "absolute", bottom: 16, right: 32 }}
    >
      <Flex justify={"space-between"}>
        <Text>Device Name</Text>
        <Button variant="subtle" color="gray" onClick={onClose}>
          <IconX />
        </Button>
      </Flex>
      <Stack>
        <Select
          label={"Usage time"}
          data={["15", "30", "60"]}
          placeholder={"Select duration"}
        />
        <Select
          label={"Intensity"}
          data={["low", "medium", "high"]}
          placeholder={"Select duration"}
        />
        <Text>Energy usage: 0.6 kWh</Text>
      </Stack>
    </Card>
  );
};
