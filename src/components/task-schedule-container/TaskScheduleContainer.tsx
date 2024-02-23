import { Button, Card, Flex, rem, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

interface TaskScheduleContainerProps {
  tasks: string[];
}

export const TaskScheduleContainer: FC<TaskScheduleContainerProps> = ({
  tasks,
}) => {
  const navigate = useNavigate();
  return (
    <Card bg={"limeGreen.0"} mih={rem(180)}>
      <Flex
        gap={"md"}
        align={"center"}
        p={0}
        h={"100%"}
        justify={"space-between"}
      >
        <Stack h={"100%"} gap={"sm"}>
          <Text fz={"md"}>Tasks for Schedule</Text>
          <Stack gap={"xs"}>
            {tasks.map((task) => (
              <Text key={task} fz={"sm"}>
                {task}
              </Text>
            ))}
          </Stack>
        </Stack>
        <Button
          variant="gradient"
          gradient={{ from: "limeGreen.5", to: "limeGreen.6", deg: 90 }}
          c={"black"}
          size={"lg"}
          onClick={() => navigate(`planer`, { replace: true })}
        >
          Scheduler
        </Button>
      </Flex>
    </Card>
  );
};
