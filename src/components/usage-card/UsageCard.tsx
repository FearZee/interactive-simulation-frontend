import { Card, rem } from "@mantine/core";
import { AreaChart } from "@mantine/charts";

export const UsageChart = () => {
  return (
    <Card bg={"#fff"}>
      <AreaChart
        h={rem(350)}
        data={data}
        dataKey="hour"
        series={[
          { name: "Goal", color: "lime-green.7" },
          { name: "Your", color: "blue.6" },
        ]}
        curveType="linear"
      />
    </Card>
  );
};

const data = [
  { hour: "0", Goal: 16, Your: 7 },
  { hour: "1", Goal: 12, Your: 4 },
  { hour: "2", Goal: 19, Your: 15 },
  { hour: "3", Goal: 5, Your: 17 },
  { hour: "4", Goal: 11, Your: 6 },
  { hour: "5", Goal: 18, Your: 1 },
  { hour: "6", Goal: 7, Your: 3 },
  { hour: "7", Goal: 14, Your: 12 },
  { hour: "8", Goal: 1, Your: 19 },
  { hour: "9", Goal: 8, Your: 9 },
  { hour: "10", Goal: 3, Your: 7 },
  { hour: "11", Goal: 14, Your: 6 },
  { hour: "12", Goal: 13, Your: 20 },
  { hour: "13", Goal: 18, Your: 1 },
  { hour: "14", Goal: 15, Your: 9 },
  { hour: "15", Goal: 8, Your: 16 },
  { hour: "16", Goal: 2, Your: 4 },
  { hour: "17", Goal: 18, Your: 17 },
  { hour: "18", Goal: 11, Your: 19 },
  { hour: "19", Goal: 14, Your: 14 },
  { hour: "20", Goal: 7, Your: 20 },
  { hour: "21", Goal: 20, Your: 9 },
  { hour: "22", Goal: 5, Your: 18 },
  { hour: "23", Goal: 19, Your: 3 },
];
