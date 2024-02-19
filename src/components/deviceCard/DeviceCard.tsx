import { Button, Card, Flex, Select, Stack, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FC } from "react";
import { UserScheduleDevice } from "../../state/userSchedule.ts";

interface DeviceCardProps {
  selected: UserScheduleDevice;
  onClose: () => void;
}

// TODO: Add props to add interactivity
export const DeviceCard: FC<DeviceCardProps> = ({ selected, onClose }) => {
  const timeOptions = Array.from({ length: 12 }, (_, i) =>
    ((i + 1) * 5).toString(),
  );

  return (
    <Card
      bg={"#fff"}
      w={400}
      shadow={"0 4px 16px rgba(0,0,0,0.25)"}
      style={{ position: "absolute", bottom: 16, right: 32 }}
    >
      <Flex justify={"space-between"}>
        <Text>{selected?.name}</Text>
        <Button variant="subtle" color="gray" onClick={onClose}>
          <IconX />
        </Button>
      </Flex>
      <Stack>
        <Select
          defaultValue={selected.duration.toString()}
          label={"Usage time"}
          data={timeOptions}
          styles={{ dropdown: { border: "1px solid #000" } }}
        />
        <Select
          label={"Intensity"}
          data={["low", "medium", "high"]}
          placeholder={"Select duration"}
        />
        <Text>
          Energy usage: {((selected.wattage / 1000) * selected.duration) / 60}
          kWh
        </Text>
      </Stack>
    </Card>
  );
};
