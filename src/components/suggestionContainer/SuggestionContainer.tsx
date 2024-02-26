import {
  Card,
  Flex,
  NumberInput,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { SuggestionCard } from "./SuggestionCard.tsx";
import { FC, useState } from "react";
import { useTipsQuery } from "../../data/simulation/simulation.queries.ts";
import { userScheduleAtom } from "../../state/userSchedule.ts";
import { useAtom } from "jotai";

interface SuggestionContainerProps {
  simulationReference: string;
}

const suggestionTexts: { [key: string]: { text: string } } = {
  ["heat-pump"]: {
    text: "There is unused energy from the photovoltaic system. Consider using a heat pump to efficiently transfer and retain heat, reducing evening energy needs in a well-insulated building.",
  },
  battery: {
    text: "Consider charging the battery during the day to store excess energy and use it during the evening.",
  },
  wallbox: {
    text: "Consider charging the electric vehicel in the available hours (20:00 - 06:00) and choose the time with the lowest energy price.",
  },
};

export const SuggestionContainer: FC<SuggestionContainerProps> = ({
  simulationReference,
}) => {
  const [userSchedule] = useAtom(userScheduleAtom);
  const { data, isLoading } = useTipsQuery(simulationReference, userSchedule);
  const [filterHour, setFilterHour] = useState(12);

  if (isLoading || !data) {
    return (
      <Card bg={"#fff"} h={"100%"}>
        <Text>Good-to-know</Text>
        <Space h={"xl"} />
        <Stack h={"100%"} justify={"center"} align={"center"}>
          <Text c={"dimmed"} fz={"sm"}>
            Please create a Schedule for the day
          </Text>
        </Stack>
      </Card>
    );
  }

  const formattedHour = filterHour.toString().padStart(2, "0");
  const timeString = `${formattedHour}:00`;

  return (
    <Card bg={"#fff"} h={"100%"}>
      <Text>Good-to-know</Text>
      <Card bg={"#fff"} shadow={"0 4px 16px rgba(199,199,199, 0.5)"} h={120}>
        <Flex gap={"md"} h={"100%"}>
          <NumberInput
            min={0}
            max={23}
            label="Time"
            value={filterHour}
            onChange={(v) => setFilterHour(Number(v))}
          />
          <TextInput label="Type" placeholder="Heating" />
        </Flex>
      </Card>
      <Space h={"xl"} />
      <Stack h={"100%"}>
        <Text fz={"xl"}>{timeString}</Text>
        <Text>{data[filterHour].message}</Text>
        {data[filterHour].devices?.map((tip) => (
          <SuggestionCard
            device={tip.device}
            text={suggestionTexts[tip.device.type]?.text || tip.message}
          />
        ))}
      </Stack>
    </Card>
  );
};
