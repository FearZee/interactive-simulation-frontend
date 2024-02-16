import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSimulation,
  fetchSimulationByReference,
} from "./simulation.api.ts";
import { Simulation } from "./simulation.types.ts";

export const useSimulationQuery = (
  simulationReference: Simulation["reference"],
) =>
  useQuery({
    queryKey: ["simulation", simulationReference],
    queryFn: () => fetchSimulationByReference(simulationReference),
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
