import { Card, SimpleGrid, Space, Stack, Text } from "@mantine/core";
import { FC } from "react";

interface InfoContainerProps {
  time: string;
  powerConsumption: number;
  photovoltaicOutput: number;
  electricityPrice: number;
}

export const InfoContainer: FC<InfoContainerProps> = ({
  time,
  powerConsumption,
  photovoltaicOutput,
  electricityPrice,
}) => {
  return (
    <Card bg={"#fff"}>
      <Text>Time-related data: {time}</Text>
      <Space h={"sm"} />
      <SimpleGrid cols={2} spacing={"sm"}>
        <CustomCard>
          <Text>Power consumption</Text>
          <Text fz={"xl"} w={"100%"} ta={"center"}>
            {powerConsumption.toFixed(2)}{" "}
            <span style={{ fontSize: "1rem" }}>kWh</span>
          </Text>
        </CustomCard>
        <CustomCard>
          <Text>Photovoltaic output</Text>
          <Text fz={"xl"} w={"100%"} ta={"center"}>
            {photovoltaicOutput.toFixed(2)}{" "}
            <span style={{ fontSize: "1rem" }}>kWh</span>
          </Text>
        </CustomCard>
        <CustomCard>
          <Text>Electricity price</Text>
          <Text fz={"xl"} w={"100%"} ta={"center"}>
            {electricityPrice.toFixed(2)}
            <span style={{ fontSize: "1rem" }}>Cent/kWh</span>
          </Text>
        </CustomCard>
        <CustomCard>
          <Text>Power consumption</Text>
          <Text fz={"xl"} w={"100%"} ta={"center"}>
            {powerConsumption.toFixed(2)}
          </Text>
        </CustomCard>
      </SimpleGrid>
    </Card>
  );
};

interface CustomCardProps {
  children: React.ReactNode;
}

const CustomCard: FC<CustomCardProps> = ({ children }) => {
  return (
    <Card>
      <Stack align={"start"} gap={"sm"}>
        {children}
      </Stack>
    </Card>
  );
};
