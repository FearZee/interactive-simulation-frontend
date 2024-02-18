import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

export const SimulationShell = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1921px)");

  console.log(isLargeScreen);

  return (
    <AppShell>
      <AppShell.Main
        p={"md"}
        h={"100%"}
        maw={isLargeScreen ? "100rem" : "80rem"}
        m={"auto"}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
