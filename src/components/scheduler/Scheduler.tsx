import {
  Button,
  Card,
  Divider,
  Grid,
  GridCol,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { TimeSlot } from "../time-slot/TimeSlot.tsx";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { AppModal } from "../modal/Modal.tsx";
import { LineChart } from "@mantine/charts";
import { DeviceCard } from "../deviceCard/DeviceCard.tsx";
import { useSimulationQuery } from "../../data/simulation/simulation.queries.ts";
import { useScheduleDevicesQuery } from "../../data/schedule/schedule.queries.ts";
import { ScheduleDevice } from "../../data/schedule/schedule.types.ts";
import { usePhotovoltaicQuery } from "../../data/photovoltaic/photovoltaic.queries.ts";
import { useMarketPriceQueries } from "../../data/market-price/marketPrice.queries.ts";
import dayjs from "dayjs";
import {
  userScheduleAtom,
  UserScheduleDevice,
} from "../../state/userSchedule.ts";
import { randomId } from "@mantine/hooks";
import { useBattery } from "../../utils/useBattery.ts";
import { useHeatFactor } from "../../utils/useHeatFactor.ts";
import { useAtom } from "jotai";

interface SchedulerProps {
  simulationReference?: string;
}

const dayOfYearToDate = (dayOfYear: number) => {
  const currentDate = new Date(new Date().getFullYear(), 0);
  const targetDate = new Date(currentDate.setDate(dayOfYear));

  // Format the date as a string
  const dateString = targetDate.toISOString().split("T")[0];

  return dayjs(dateString).format("DD.MM.YYYY");
};

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

  const navigate = useNavigate();
  const [loading] = useState(false);
  const [opened, setOpened] = useState<string | null>(null);

  const [selected, setSelect] = useState<UserScheduleDevice | null>(null);

  // TODO make this more performant
  const batteryStorage = useBattery(simulationReference);
  const heatFactor = useHeatFactor(simulationReference);
  const [userSchedule] = useAtom(userScheduleAtom);

  if (
    isLoading ||
    isScheduleLoading ||
    !scheduleDevices ||
    !simulation ||
    !outputPV ||
    !marketPrice ||
    !batteryStorage ||
    !heatFactor
  ) {
    return <LoadingTimeSlot />;
  }

  const date = dayOfYearToDate(simulation?.day);

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
          {[...Array(24).keys()].map((key) => (
            <div key={randomId()}>
              <TimeSlot
                key={key}
                time={key}
                onSelect={setSelect}
                devices={scheduleDevicesObject[key]}
                pvOutput={outputPV?.energy[key]}
                marketPrice={marketPrice?.price[key]}
                batteryStorage={batteryStorage[Number(key)].batteryStorage}
                heatFactor={heatFactor[Number(key)].heatFactor}
              />
              <Divider key={randomId()} />
            </div>
          ))}
        </Stack>
        {selected && (
          <DeviceCard selected={selected} onClose={() => setSelect(null)} />
        )}
      </ScrollArea>
    );

  const tasks = [
    "Eigenverbrauch maximieren",
    "Heat factor über 0.4 halten",
    "Elektroauto mit 7 kWh laden",
    "Battery auf 5 kWh haben",
  ];

  const handleConfirmSchedule = () => {
    console.log("Confirm schedule", userSchedule);
    navigate(`/${simulationReference}`);
  };

  return (
    <>
      <AppModal
        title={"Photovoltaic energy production"}
        opened={opened === "pv"}
        close={() => setOpened(null)}
        modalContent={
          <LineChart
            h={300}
            data={Object.keys(outputPV?.energy).map((value, index) => ({
              index: index,
              hour: index,
              value: outputPV?.energy[value] || 0,
            }))}
            dataKey="hour"
            series={[{ name: "value", color: "indigo.6" }]}
            yAxisProps={{ width: 100 }}
            curveType="linear"
            valueFormatter={(value) => `${value.toFixed(2)} kWh`}
          />
        }
      />
      <AppModal
        title={"Energy market prices"}
        opened={opened === "market"}
        close={() => setOpened(null)}
        modalContent={
          <LineChart
            h={300}
            data={Object.keys(marketPrice?.price).reduce(
              (
                acc: { index: number; hour: number; value: number }[],
                value,
                index,
              ) => {
                acc.push({
                  index: index,
                  hour: index,
                  value: marketPrice?.price[value],
                });
                return acc;
              },
              [],
            )}
            dataKey="hour"
            series={[{ name: "value", color: "indigo.6" }]}
            curveType="linear"
            yAxisProps={{ width: 100 }}
            valueFormatter={(value) => `${value.toFixed(2)} cent`}
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
                onClick={() => setOpened("pv")}
              >
                Photovoltaic
              </Button>
              <Button
                variant="default"
                color="gray"
                onClick={() => setOpened("market")}
              >
                Energy market
              </Button>
              <Divider />
              <Text fz={"lg"}>Tasks</Text>
              {tasks.map((task, index) => (
                <Text key={index} fz={"sm"}>
                  {task}
                </Text>
              ))}
            </Stack>
            <Button
              variant="gradient"
              gradient={{ from: "limeGreen.5", to: "limeGreen.6", deg: 90 }}
              c={"black"}
              onClick={handleConfirmSchedule}
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
