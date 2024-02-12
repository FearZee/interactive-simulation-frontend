import {Card, SimpleGrid, Stack, Text} from "@mantine/core";
import {FC} from "react";

interface InfoContainerProps {
    time: string;
    powerConsumption: number;
    photovoltaicOutput: number;
    electricityPrice: number;
}

export const InfoContainer: FC<InfoContainerProps> = ({time, powerConsumption,photovoltaicOutput, electricityPrice}) => {
    return (
        <Card bg={"#fff"}>
            <Text>Time-related data: {time}</Text>
            <SimpleGrid cols={2}>
                    <CustomCard>
                        <Text>Power consumption</Text>
                        <Text fz={'xl'} w={'100%'} ta={'center'}>{powerConsumption} <span style={{fontSize: '1rem'}}>kWh</span></Text>
                    </CustomCard>
                    <CustomCard>
                        <Text>Photovoltaic output</Text>
                        <Text fz={'xl'} w={'100%'} ta={'center'}>{photovoltaicOutput} <span style={{fontSize: '1rem'}}>kWh</span></Text>
                    </CustomCard>
                    <CustomCard>
                        <Text>Electricity price</Text>
                        <Text fz={'xl'} w={'100%'} ta={'center'}>{electricityPrice} <span style={{fontSize: '1rem'}}>Cent/kWh</span></Text>
                    </CustomCard>
                    <CustomCard>
                        <Text>Power consumption</Text>
                        <Text fz={'xl'} w={'100%'} ta={'center'}>{powerConsumption}</Text>
                    </CustomCard>
            </SimpleGrid>
        </Card>
    );
}

interface CustomCardProps {
    children: React.ReactNode;
}

const CustomCard: FC<CustomCardProps> = ({children}) => {
    return (
        <Card>
            <Stack align={'start'}>
                {children}
            </Stack>
        </Card>
    )
}