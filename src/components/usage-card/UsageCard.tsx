import { Card, em, rem, Skeleton, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useLayoutEffect, useState } from "react";
import { useScheduleDevicesQuery } from "../../data/schedule/schedule.queries.ts";
import { useAtom } from "jotai";
import { userScheduleAtom } from "../../state/userSchedule.ts";

interface UsageChartProps {
  scheduleComplete: {
    [key: string]: {
      [key: string]: {
        duration: number;
        usage: number;
      };
    };
  };
  scheduleReference: string;
}

export const UsageChart: FC<UsageChartProps> = ({
  scheduleComplete,
  scheduleReference,
}) => {
  const isLargeHeight = useMediaQuery(`(min-height: ${em(1000)})`);
  const isSmallHeight = useMediaQuery(`(max-height: ${em(920)})`);
  const [height, setHeight] = useState(window.innerHeight);
  const { data: scheduleDevices } = useScheduleDevicesQuery(scheduleReference);
  const [userSchedule] = useAtom(userScheduleAtom);

  useLayoutEffect(() => {
    addEventListener("resize", () => {
      setHeight(window.innerHeight);
    });

    return () => {
      removeEventListener("resize", () => {});
    };
  }, []);

  const heightFactor = isLargeHeight ? 1.35 : isSmallHeight ? 1 : 1.2;

  if (!scheduleDevices)
    return (
      <Skeleton height={rem(Math.max(300, (height * heightFactor) / 3 - 16))} />
    );

  const data = Object.keys(scheduleComplete).map((key) => {
    let usage = 0;
    Object.keys(scheduleComplete[key]).map((key2) => {
      usage += scheduleComplete[key][key2].usage;
    });

    let userUsage = null;
    if (userSchedule) {
      userUsage =
        userSchedule
          .filter((item) => item.time_slot === parseInt(key))
          .reduce((acc, val) => {
            return (
              acc + val.device.reduce((acc, val) => acc + val.wattage / 1000, 0)
            );
          }, 0) +
        scheduleDevices
          .filter((device) => device.time_slot === parseInt(key))
          .reduce(
            (acc, val) =>
              acc + (val.base_device.wattage / 1000) * (val.duration / 60),
            0,
          );
    }

    return {
      hour: key,
      Goal: usage,
      Your: userUsage,
    };
  });

  return (
    <Card bg={"#fff"}>
      <Text>Usage Graphs</Text>
      <AreaChart
        h={rem(Math.max(300, (height * heightFactor) / 3 - 16))}
        data={data}
        valueFormatter={(value) => value.toFixed(2)}
        yAxisProps={{ width: 80 }}
        unit=" kWh"
        dataKey="hour"
        tooltipAnimationDuration={200}
        series={[
          { name: "Goal", color: "limeGreen.7" },
          { name: "Your", color: "blue.6" },
        ]}
        withLegend
        curveType="linear"
      />
    </Card>
  );
};
