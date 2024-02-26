import { Button, Card, Flex, rem, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useAtom } from "jotai";
import { userScheduleAtom } from "../../state/userSchedule.ts";

interface TaskScheduleContainerProps {
  tasks: string[];
}

export const TaskScheduleContainer: FC<TaskScheduleContainerProps> = ({
  tasks,
}) => {
  const navigate = useNavigate();
  const [userSchedule] = useAtom(userScheduleAtom);

  const handleCreateNewDay = () => {
    // TODO create new day for simulation
  };
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
        <Stack>
          <Button
            variant="gradient"
            gradient={{ from: "limeGreen.5", to: "limeGreen.6", deg: 90 }}
            c={"black"}
            size={"lg"}
            onClick={() => navigate(`planer`, { replace: true })}
          >
            Scheduler
          </Button>
          {userSchedule && (
            <Button
              variant="gradient"
              gradient={{ from: "limeGreen.2", to: "limeGreen.2", deg: 90 }}
              c={"dimmed"}
              size={"md"}
              onClick={handleCreateNewDay}
            >
              Create a new Day
            </Button>
          )}
        </Stack>
      </Flex>
    </Card>
  );
};
