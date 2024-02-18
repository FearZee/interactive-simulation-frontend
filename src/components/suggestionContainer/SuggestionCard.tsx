import {
  Card,
  getGradient,
  useMantineTheme,
  Text,
  Accordion,
  Flex,
  Image,
  Stack,
} from "@mantine/core";
import img from "./image 5.png";

export const SuggestionCard = () => {
  const theme = useMantineTheme();
  return (
    <Card bg={getGradient({ deg: 90, from: "blue.1", to: "blue.2" }, theme)}>
      <Stack gap={"md"}>
        <Text>Device Name</Text>
        <Flex gap={"sm"} align={"center"}>
          <Text>
            Due to low temperatur and unsaved temperatur inside the house, there
            is a higher heat pump usage
          </Text>
          <Image src={img} alt="Heat Pump" />
        </Flex>
        <Accordion variant="separated">
          <Accordion.Item bg={"#fff"} key={"helpMe"} value={"helpMe"}>
            <Accordion.Control>{"Help me"}</Accordion.Control>
            <Accordion.Panel>
              Consider using a heat pump to efficiently transfer and retain
              heat, reducing evening energy needs in a well-insulated building.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Card>
  );
};
