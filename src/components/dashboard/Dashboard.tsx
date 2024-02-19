import { TimeAndWeatherInfo } from "../time-and-weather-container/TimeAndWeatherContainer.tsx";
import { UsageChart } from "../usage-card/UsageCard.tsx";
import { InfoContainer } from "../info-container/InfoContainer.tsx";
import { Button, Grid, LoadingOverlay, Stack } from "@mantine/core";
import { SuggestionContainer } from "../suggestionContainer/SuggestionContainer.tsx";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useSimulationQuery } from "../../data/simulation/simulation.queries.ts";
import { useScheduleQuery } from "../../data/schedule/schedule.queries.ts";
import { useMarketPriceQueries } from "../../data/market-price/marketPrice.queries.ts";
import { usePhotovoltaicQuery } from "../../data/photovoltaic/photovoltaic.queries.ts";

interface DashboardProps {
  simulationReference?: string;
}

export const Dashboard: FC<DashboardProps> = ({ simulationReference }) => {
  const { data: simulation, isLoading } =
    useSimulationQuery(simulationReference);
  const { data: schedule, isLoading: isScheduleLoading } = useScheduleQuery(
    simulation?.schedule_reference,
  );
  const { data: marketPrice } = useMarketPriceQueries(
    simulation?.energy_market_reference,
  );

  const { data: photovoltaic } = usePhotovoltaicQuery(
    simulation?.day,
    simulation?.photovoltaic_reference,
  );

  const navigate = useNavigate();

  if (
    isLoading ||
    isScheduleLoading ||
    !schedule ||
    !simulation ||
    !marketPrice ||
    !photovoltaic
  ) {
    return <LoadingOverlay />;
  }

  const powerConsumption = Object.values(schedule.complete[12]).reduce(
    (acc, val) => acc + val.usage,
    0,
  );

  return (
    <Grid gutter="md" mt={".5rem"} grow h={"100%"}>
      <Grid.Col span={8} h={"100%"}>
        <Stack justify={"space-between"} h={"100%"}>
          <TimeAndWeatherInfo
            weatherReference={simulation.weather_reference}
            day={simulation.day}
          />
          <UsageChart scheduleComplete={schedule?.complete} />
          <InfoContainer
            time={"12:00"}
            electricityPrice={marketPrice?.price[12]}
            powerConsumption={powerConsumption}
            photovoltaicOutput={photovoltaic.energy[12]}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack justify={"space-between"} h={"100%"}>
          <SuggestionContainer />
          <Button
            variant="gradient"
            gradient={{ from: "limeGreen.5", to: "limeGreen.6", deg: 90 }}
            c={"black"}
            size={"lg"}
            onClick={() => navigate(`planer`, { replace: true })}
          >
            Scheduler
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
