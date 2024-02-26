import { api } from "../api.ts";
import { Simulation, Tip } from "./simulation.types.ts";
import { UserSchedule } from "../../state/userSchedule.ts";

export const fetchSimulationByReference = (simulationReference: string) =>
  api.get(`simulation/${simulationReference}`).json<Simulation>();

export const createSimulation = () => api.put("simulation").json<Simulation>();

export const simulationUsageByDay = (
  simulationReference: string,
  day: number,
) => api.get(`simulation/${simulationReference}/${day}/complete_usage`).json();

export const fetchSimulationTips = (
  simulationReference: string,
  userSchedule: UserSchedule[],
) => {
  return api
    .put(`simulation/${simulationReference}/tips`, {
      body: JSON.stringify(userSchedule),
    })
    .json<Tip>();
};

export const updateSimulationNewDay = (simulationReference: string) =>
  api.post(`simulation/${simulationReference}/new-day`).json<Simulation>();
