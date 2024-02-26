import {
  Card,
  Flex,
  getGradient,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import img from "./image 5.png";
import { FC } from "react";

interface SuggestionCardProps {
  device: {
    name: string;
    reference: string;
    type: string;
  };
  text: string;
}

export const SuggestionCard: FC<SuggestionCardProps> = ({ device, text }) => {
  const theme = useMantineTheme();
  return (
    <Card bg={getGradient({ deg: 90, from: "blue.1", to: "blue.2" }, theme)}>
      <Stack gap={"md"}>
        <Text>{device.name}</Text>
        <Flex gap={"sm"} align={"center"}>
          <Text>{text}</Text>
          <Image src={img} alt={device.name} />
        </Flex>
        {/*<Accordion variant="separated">*/}
        {/*  <Accordion.Item bg={"#fff"} key={"helpMe"} value={"helpMe"}>*/}
        {/*    <Accordion.Control>{"Help me"}</Accordion.Control>*/}
        {/*    <Accordion.Panel>*/}
        {/*      Consider using a heat pump to efficiently transfer and retain*/}
        {/*      heat, reducing evening energy needs in a well-insulated building.*/}
        {/*    </Accordion.Panel>*/}
        {/*  </Accordion.Item>*/}
        {/*</Accordion>*/}
      </Stack>
    </Card>
  );
};
