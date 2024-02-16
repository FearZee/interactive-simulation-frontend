import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSimulation,
  fetchSimulationByReference,
} from "./simulation.api.ts";
import { Simulation } from "./simulation.types.ts";

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
