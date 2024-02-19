import {
  Button,
  Card,
  Grid,
  GridCol,
  ScrollArea,
  Skeleton,
  Stack,
} from "@mantine/core";
import { TimeSlot } from "../time-slot/TimeSlot.tsx";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { AppModal } from "../modal/Modal.tsx";
import { LineChart } from "@mantine/charts";
import { DeviceCard } from "../deviceCard/DeviceCard.tsx";
import { useSimulationQuery } from "../../data/simulation/simulation.queries.ts";
import { useScheduleDevicesQuery } from "../../data/schedule/schedule.queries.ts";
import { ScheduleDevice } from "../../data/schedule/schedule.types.ts";
import { usePhotovoltaicQuery } from "../../data/photovoltaic/photovoltaic.queries.ts";
import { useMarketPriceQueries } from "../../data/market-price/marketPrice.queries.ts";

interface SchedulerProps {
  simulationReference?: string;
}

export const Scheduler: FC<SchedulerProps> = ({ simulationReference }) => {
  const { data: simulation, isLoading } =
    useSimulationQuery(simulationReference);
  const { data: scheduleDevices, isLoading: isScheduleLoading } =
    useScheduleDevicesQuery(simulation?.schedule_reference);
  const { data: outputPV } = usePhotovoltaicQuery(
    simulation?.day,
    simulation?.photovoltaic_reference,
  );
  const { data: marketPrice } = useMarketPriceQueries(
    simulation?.energy_market_reference,
  );
  const date = "22.01.2024";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  const [selected, setSelect] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (
    isLoading ||
    isScheduleLoading ||
    !scheduleDevices ||
    !simulation ||
    !outputPV ||
    !marketPrice
  ) {
    return <LoadingTimeSlot />;
  }

  const scheduleDevicesObject = scheduleDevices.reduce(
    (obj: { [key: string]: ScheduleDevice[] }, item) => {
      if (!obj[item.time_slot]) {
        obj[item.time_slot] = [item];
      } else {
        obj[item.time_slot].push(item);
      }
      return obj;
    },
    {},
  );

  const renderSlotList = () =>
    loading ? (
      <LoadingTimeSlot />
    ) : (
      <ScrollArea h={"calc(100vh - 2rem)"} offsetScrollbars>
        <Stack gap={"md"}>
          {Object.keys(scheduleDevicesObject).map((key) => (
            <TimeSlot
              key={key}
              time={key}
              onSelect={setSelect}
              devices={scheduleDevicesObject[key]}
              pvOutput={outputPV?.energy[key]}
              marketPrice={marketPrice?.price[key]}
            />
          ))}
        </Stack>
        {selected && <DeviceCard onClose={() => setSelect(null)} />}
      </ScrollArea>
    );

  return (
    <>
      <AppModal
        title={"Photovoltaic energy production"}
        opened={opened}
        close={() => setOpened(false)}
        modalContent={
          <LineChart
            h={300}
            data={dataArray}
            dataKey="hour"
            series={[{ name: "value", color: "indigo.6" }]}
            curveType="linear"
          />
        }
      />
      <Grid>
        <GridCol span={2} h={"100%"}>
          <Stack justify={"space-between"} h={"calc(100vh - 2rem)"}>
            <Stack gap={"md"}>
              <Card ta={"center"} p={"sm"} bg={"rgb(200, 200, 200)"}>
                {date}
              </Card>
              <Button
                variant="default"
                color="gray"
                onClick={() => setOpened(true)}
              >
                Photovoltaic
              </Button>
              <Button variant="default" color="gray">
                Weather
              </Button>
              <Button variant="default" color="gray">
                Energy market
              </Button>
            </Stack>
            <Button
              variant="gradient"
              gradient={{ from: "lime-green.5", to: "lime-green.6", deg: 90 }}
              c={"black"}
              onClick={() => navigate("/dashboard")}
            >
              Accept Schedule
            </Button>
          </Stack>
        </GridCol>
        <GridCol span={10} pos={"relative"}>
          {renderSlotList()}
        </GridCol>
      </Grid>
    </>
  );
};

const LoadingTimeSlot = () => {
  return (
    <Stack gap={"md"}>
      <Skeleton h={280}></Skeleton>
      <Skeleton h={280}></Skeleton>
      <Skeleton h={280}></Skeleton>
    </Stack>
  );
};

const dataArray = [
  { index: 0, hour: 0, value: 0 },
  { index: 1, hour: 1, value: 0 },
  { index: 2, hour: 2, value: 0 },
  { index: 3, hour: 3, value: 0 },
  { index: 4, hour: 4, value: 0 },
  { index: 5, hour: 5, value: 0 },
  { index: 6, hour: 6, value: 0 },
  { index: 7, hour: 7, value: 0 },
  { index: 8, hour: 8, value: 1.456430895 },
  { index: 9, hour: 9, value: 6.39857097 },
  { index: 10, hour: 10, value: 6.925654994 },
  { index: 11, hour: 11, value: 3.050483529 },
  { index: 12, hour: 12, value: 2.760623009 },
  { index: 13, hour: 13, value: 5.276061796 },
  { index: 14, hour: 14, value: 8.844594436 },
  { index: 15, hour: 15, value: 3.854294013 },
  { index: 16, hour: 16, value: 8.775178442 },
  { index: 17, hour: 17, value: 0 },
  { index: 18, hour: 18, value: 0 },
  { index: 19, hour: 19, value: 0 },
  { index: 20, hour: 20, value: 0 },
  { index: 21, hour: 21, value: 0 },
  { index: 22, hour: 22, value: 0 },
  { index: 23, hour: 23, value: 0 },
];
