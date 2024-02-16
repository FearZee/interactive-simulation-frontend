import { TimeAndWeatherInfo } from "../time-and-weather-container/TimeAndWeatherContainer.tsx";
import { UsageChart } from "../usage-card/UsageCard.tsx";
import { InfoContainer } from "../info-container/InfoContainer.tsx";
import { Button, Grid, LoadingOverlay, Stack } from "@mantine/core";
import { SuggestionContainer } from "../SuggestionContainer/SuggestionContainer.tsx";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useSimulationQuery } from "../../data/simulation/simulation.queries.ts";

interface DashboardProps {
  simulationReference?: string;
}

export const Dashboard: FC<DashboardProps> = ({ simulationReference }) => {
  const { data: simulation, isLoading } =
    useSimulationQuery(simulationReference);
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Grid gutter="md" mt={".5rem"} grow h={"100%"}>
      <Grid.Col span={8} h={"100%"}>
        <Stack justify={"space-between"} h={"100%"}>
          <TimeAndWeatherInfo />
          <UsageChart />
          <InfoContainer
            time={"12:00"}
            electricityPrice={5.05}
            powerConsumption={1.2}
            photovoltaicOutput={3.6}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack justify={"space-between"} h={"100%"}>
          <SuggestionContainer />
          <Button
            variant="gradient"
            gradient={{ from: "lime-green.5", to: "lime-green.6", deg: 90 }}
            c={"black"}
            size={"lg"}
            onClick={() => navigate("/planer")}
          >
            Scheduler
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
