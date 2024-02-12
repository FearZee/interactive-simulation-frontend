import { Flex, Stack, Text } from "@mantine/core";
import { IconCloud, IconCloudRain, IconSun } from "@tabler/icons-react";
import { FC } from "react";

const day = "22.01.2024";

const weather = [
    { weatherType: "cloud", temp: 14, hour: "00:00" },
    { weatherType: "cloud", temp: 6, hour: "02:00" },
    { weatherType: "sun", temp: 18, hour: "04:00" },
    { weatherType: "sun", temp: 11, hour: "06:00" },
    { weatherType: "sun", temp: 9, hour: "08:00" },
    { weatherType: "cloud", temp: 12, hour: "10:00" },
    { weatherType: "rain", temp: 15, hour: "12:00" },
    { weatherType: "rain", temp: 19, hour: "14:00" },
    { weatherType: "rain", temp: 17, hour: "16:00" },
    { weatherType: "cloud", temp: 8, hour: "18:00" },
    { weatherType: "cloud", temp: 2, hour: "20:00" },
    { weatherType: "cloud", temp: 4, hour: "22:00" },
];
export const TimeAndWeatherInfo = () => {
    return (
        <Stack align={"flex-start"}>
            <Text>{day}</Text>
            <Flex justify={'space-evenly'} w={'100%'}>
                {weather.map((item, index) => (
                    <WeatherItem
                        key={index}
                        weatherType={item.weatherType}
                        temp={item.temp}
                        hour={item.hour}
                    />
                ))}
            </Flex>
        </Stack>
    );
};

interface WeatherItemProps {
    weatherType: string;
    temp: number;
    hour: string;
}

const WeatherItem: FC<WeatherItemProps> = ({ weatherType, temp, hour }) => {
    return (
        <Stack gap={"xs"}>
            <Text>
                {(weatherType == "sun" && <IconSun />) ||
                    (weatherType == "rain" && <IconCloudRain />) ||
                    (weatherType == "cloud" && <IconCloud />)}
            </Text>
            <Text>{temp}°C</Text>
            <Text>{hour}</Text>
        </Stack>
    );
};