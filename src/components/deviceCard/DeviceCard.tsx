import {
  Button,
  Card,
  Flex,
  NumberInput,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FC, useState } from "react";
import {
  userScheduleAtom,
  UserScheduleDevice,
} from "../../state/userSchedule.ts";
import { useAtom } from "jotai";

interface DeviceCardProps {
  selected: UserScheduleDevice;
  onClose: () => void;
}

// TODO: Add props to add interactivity
export const DeviceCard: FC<DeviceCardProps> = ({ selected, onClose }) => {
  const timeOptions = Array.from({ length: 12 }, (_, i) =>
    ((i + 1) * 5).toString(),
  );
  const [wattage, setWattage] = useState<number | null>(
    selected?.wattage ?? null,
  );
  const [duration, setDuration] = useState<number | null>(
    selected.duration ?? 60,
  );
  const [, setUserSchedule] = useAtom(userScheduleAtom);

  const handleWattageChange = (value: string | number) => {
    // goal wattage is value
    // calculate duration to reach goal
    const goal = Number(value);
    const duration = (goal / 1000 / (selected?.wattage / 1000)) * 60;
    // duration can only be a number 5, 10, 15 etc
    const roundedNum = Math.ceil(duration);
    const remainder = roundedNum % 5;
    const finalDuration =
      remainder === 0 ? roundedNum : roundedNum + (5 - remainder);

    setDuration(finalDuration);
    setWattage(goal);
    setUserSchedule((schedule) => {
      return schedule?.map((item) => {
        const foundDevice = item.device.find(
          (device) => device.reference === selected.reference,
        );
        if (foundDevice) {
          return {
            ...item,
            device: [
              ...item.device.filter((d) => d.reference !== selected.reference),
              {
                ...foundDevice,
                duration: finalDuration,
                wattage: goal,
              },
            ],
          };
        }
        return item;
      });
    });
  };

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
        <NumberInput
          label={"Wattage"}
          rightSection={<Text pr={"md"}>Wh</Text>}
          value={wattage?.toString()}
          onChange={handleWattageChange}
        />
        <Select
          label={"Duration"}
          step={5}
          data={timeOptions}
          value={duration?.toString()}
          onChange={(value) => setDuration(Number(value))}
        />
        <Space h={"md"} />
        <Text>
          Usage will be:
          <Space w={"sm"} />
          {selected &&
            duration &&
            ((selected?.wattage / 1000) * (duration / 60)).toFixed(3)}{" "}
          kWh
        </Text>
      </Stack>
    </Card>
  );
};
