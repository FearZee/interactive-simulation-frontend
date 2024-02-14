import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { SimulationShell } from "./components/SimulationShell/SimulationShell.tsx";
import { CreateOrLoadSimulation } from "./components/CreateOrLoadSimulation/CreateOrLoadSimulation.tsx";
import { SimulationRouter } from "./SimulationRouter.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<SimulationShell />}>
      <Route index element={<CreateOrLoadSimulation />} />
      <Route path={":simulationReference/*"} element={<SimulationRouter />} />
    </Route>,
  ),
);
