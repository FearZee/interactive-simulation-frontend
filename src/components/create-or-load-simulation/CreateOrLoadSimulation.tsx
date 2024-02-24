import { Button, Space, TextInput } from "@mantine/core";
import {
  createSimulation,
  fetchSimulationByReference,
} from "../../data/simulation/simulation.api.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreateOrLoadSimulation = () => {
  const foundPreviousSimulation =
    localStorage.getItem("simulationReference") || undefined;
  const [loadSimulationValue, setLoadSimulationValue] = useState(
    foundPreviousSimulation,
  );

  const navigate = useNavigate();
  const handleCreateSimulation = async () => {
    const simulation = await createSimulation();
    localStorage.setItem("simulationReference", simulation.reference);
    navigate(`/${simulation.reference}`);
  };

  const handleLoadSimulation = async () => {
    if (!loadSimulationValue) return;
    const simulation = await fetchSimulationByReference(loadSimulationValue);
    navigate(`/${simulation.reference}`);
  };

  return (
    <>
      <Button bg={"blue.2"} autoContrast onClick={handleCreateSimulation}>
        Create Simulation
      </Button>
      <>
        <TextInput
          label={"Simulation Reference"}
          value={loadSimulationValue}
          onChange={(event) =>
            setLoadSimulationValue(event.currentTarget.value)
          }
        />
        <Space h={"md"} />
        <Button bg={"blue.2"} autoContrast onClick={handleLoadSimulation}>
          Load Simulation
        </Button>
      </>
    </>
  );
};
