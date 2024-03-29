import { Route, Routes, useParams } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard.tsx";
import { Scheduler } from "./components/scheduler/Scheduler.tsx";

type SimulationRouterParams = {
  simulationReference: string;
};

export const SimulationRouter = () => {
  const { simulationReference } = useParams<SimulationRouterParams>();
  if (!simulationReference) throw new Error("simulationReference is required");

  return (
    <Routes>
      <Route path={"/"}>
        <Route
          index
          element={<Dashboard simulationReference={simulationReference} />}
        />
        <Route
          path={"planer"}
          element={<Scheduler simulationReference={simulationReference} />}
        />
      </Route>
    </Routes>
  );
};
