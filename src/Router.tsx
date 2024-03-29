import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { SimulationShell } from "./components/simulationShell/SimulationShell.tsx";
import { CreateOrLoadSimulation } from "./components/create-or-load-simulation/CreateOrLoadSimulation.tsx";
import { SimulationRouter } from "./SimulationRouter.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<SimulationShell />}>
      <Route index element={<CreateOrLoadSimulation />} />
      <Route path={":simulationReference/*"} element={<SimulationRouter />} />
    </Route>,
  ),
);
