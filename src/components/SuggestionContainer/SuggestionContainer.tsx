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

export const SuggestionContainer = () => {
  return (
    <Card bg={"#fff"} h={"90%"}>
      <Text>Good-to-know</Text>
      <Card bg={"#fff"} shadow={"0 4px 16px rgba(199,199,199, 0.5)"} h={120}>
        <Flex gap={"md"} h={"100%"}>
          <NumberInput label="Time" placeholder="13" />
          <TextInput label="Type" placeholder="Heating" />
          <TextInput label="Priority" placeholder="High" />
        </Flex>
      </Card>
      <Space h={"xl"} />
      <Stack h={"100%"}>
        <Text fz={"xl"}>13:00</Text>
        <SuggestionCard />
      </Stack>
    </Card>
  );
};
