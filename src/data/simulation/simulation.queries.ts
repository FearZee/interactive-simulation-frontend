import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSimulation,
  fetchSimulationByReference,
  fetchSimulationTips,
  updateSimulationNewDay,
} from "./simulation.api.ts";
import { Simulation } from "./simulation.types.ts";
import { UserSchedule } from "../../state/userSchedule.ts";

export const useSimulationQuery = (
  simulationReference: Simulation["reference"] | undefined,
) =>
  useQuery({
    queryKey: ["simulation", simulationReference],
    queryFn: () => {
      if (!simulationReference) return;
      return fetchSimulationByReference(simulationReference);
    },
  });

export const useCreateSimulationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createSimulation(),
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["simulation"] });
      queryClient.setQueryData(["simulation", data!.reference], data);
      return data;
    },
  });
};

export const useSimulationNewDayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (simulationReference: string) =>
      updateSimulationNewDay(simulationReference),
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["simulation"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      queryClient.setQueryData(["simulation", data!.reference], data);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["simulation"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      queryClient.setQueryData(["simulation", data!.reference], data);
      return data;
    },
  });
};

export const useTipsQuery = (
  simulationReference: Simulation["reference"],
  userSchedule?: UserSchedule[],
) =>
  useQuery({
    queryKey: ["tips"],
    queryFn: () => {
      if (!userSchedule) throw new Error("userSchedule is required");
      return fetchSimulationTips(simulationReference, userSchedule);
    },
  });
