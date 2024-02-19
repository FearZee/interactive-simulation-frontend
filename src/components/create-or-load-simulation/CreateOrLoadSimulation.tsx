import { Button, Space, TextInput } from "@mantine/core";
import { createSimulation } from "../../data/simulation/simulation.api.ts";
import { useNavigate } from "react-router-dom";

export const CreateOrLoadSimulation = () => {
  const navigate = useNavigate();
  const handleCreateSimulation = async () => {
    const simulation = await createSimulation();
    navigate(`/${simulation.reference}`);
  };

  return (
    <>
      <Button bg={"blue.2"} autoContrast onClick={handleCreateSimulation}>
        Create Simulation
      </Button>
      <>
        <TextInput label={"Simulation Reference"} />
        <Space h={"md"} />
        <Button bg={"blue.2"} autoContrast>
          Load Simulation
        </Button>
      </>
    </>
  );
};
