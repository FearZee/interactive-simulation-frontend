import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard.tsx";
import { Scheduler } from "./components/scheduler/Scheduler.tsx";
import { SimulationShell } from "./components/SimulationShell/SimulationShell.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<SimulationShell />}>
      <Route index element={<Navigate to={"/dashboard"} replace />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
      <Route path={"/planer"} element={<Scheduler />} />
    </Route>,
  ),
);
