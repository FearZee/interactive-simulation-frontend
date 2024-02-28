import { Card, Flex, rem, Skeleton, Stack, Text } from "@mantine/core";
import { IconCloud, IconCloudRain, IconSun } from "@tabler/icons-react";
import { FC } from "react";
import { useWeatherQuery } from "../../data/weather/weather.queries.ts";
import { randomId } from "@mantine/hooks";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
// const day = "22.01.2024";/

const dayOfYearToDate = (dayOfYear: number) => {
  const currentDate = new Date(new Date().getFullYear(), 0); // January 1st of the current year
  const targetDate = new Date(currentDate.setDate(dayOfYear));

  // Format the date as a string
  const dateString = targetDate.toISOString().split("T")[0];

  return dayjs(dateString).format("DD.MM.YYYY");
};

interface TimeAndWeatherInfoProps {
  weatherReference: string;
  day: number;
}

export const TimeAndWeatherInfo: FC<TimeAndWeatherInfoProps> = ({
  weatherReference,
  day,
}) => {
  const { data, isLoading } = useWeatherQuery(weatherReference);
  const t = dayOfYearToDate(day);

  if (isLoading || !data) {
    return <Skeleton height={rem(180)} />;
  }

  return (
    <Card mih={rem(180)}>
      <Stack align={"flex-start"}>
        <Text>{t}</Text>
        <Flex justify={"space-evenly"} w={"100%"}>
          {Object.keys(data.weather).map((key, index) =>
            index % 2 === 0 ? (
              <WeatherItem
                key={randomId()}
                weatherType={data.weather[key].sun - data.weather[key].cloud}
                temp={data.weather[key].temperature}
                hour={key}
              />
            ) : null,
          )}
        </Flex>
      </Stack>
    </Card>
  );
};

interface WeatherItemProps {
  weatherType: number;
  temp: number;
  hour: string;
}

const WeatherItem: FC<WeatherItemProps> = ({ weatherType, temp, hour }) => {
  const formattedHour = hour.padStart(2, "0");
  const timeString = `${formattedHour}:00`;
  return (
    <Stack gap={"sm"}>
      <Text>
        {(weatherType > 0 && <IconSun />) ||
          (weatherType < -0.8 && <IconCloudRain />) || <IconCloud />}
      </Text>
      <Text>{temp.toFixed(0)}°C</Text>
      <Text>{timeString}</Text>
    </Stack>
  );
};
