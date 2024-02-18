import { Card, em, rem } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useLayoutEffect, useState } from "react";

interface UsageChartProps {
  scheduleComplete: {
    [key: string]: {
      [key: string]: {
        duration: number;
        usage: number;
      };
    };
  };
}

export const UsageChart: FC<UsageChartProps> = ({ scheduleComplete }) => {
  const isLargeHeight = useMediaQuery(`(min-height: ${em(1000)})`);
  const isSmallHeight = useMediaQuery(`(max-height: ${em(920)})`);
  const [height, setHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    addEventListener("resize", () => {
      setHeight(window.innerHeight);
    });

    return () => {
      removeEventListener("resize", () => {});
    };
  }, []);

  const heightFactor = isLargeHeight ? 1.4 : isSmallHeight ? 1 : 1.2;

  const data = Object.keys(scheduleComplete).map((key) => {
    let usage = 0;
    Object.keys(scheduleComplete[key]).map((key2) => {
      usage += scheduleComplete[key][key2].usage;
    });

    return {
      hour: key,
      Goal: usage,
    };
  });

  return (
    <Card bg={"#fff"}>
      <AreaChart
        h={rem(Math.max(300, (height * heightFactor) / 3 - 16))}
        data={data}
        valueFormatter={(value) => value.toFixed(2)}
        yAxisProps={{ width: 80 }}
        unit=" kWh"
        dataKey="hour"
        tooltipAnimationDuration={200}
        series={[
          { name: "Goal", color: "lime-green.7" },
          { name: "Your", color: "blue.6" },
        ]}
        curveType="linear"
      />
    </Card>
  );
};
