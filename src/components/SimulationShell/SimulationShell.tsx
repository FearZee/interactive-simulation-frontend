import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const SimulationShell = () => {
  return (
    <AppShell>
      <AppShell.Main p={"md"} h={"100%"}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
