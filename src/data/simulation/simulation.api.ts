import { api } from "../api.ts";
import { Simulation } from "./simulation.types.ts";

export const fetchSimulationByReference = (simulationReference: string) =>
  api.get(`/simulation/${simulationReference}`).json<Simulation>();

export const createSimulation = () => api.put("/simulation").json<Simulation>();

export const simulationUsageByDay = (
  simulationReference: string,
  day: number,
) => api.get(`/simulation/${simulationReference}/${day}/complete_usage`).json();
