import { Button, Space, TextInput } from "@mantine/core";

export const CreateOrLoadSimulation = () => {
  const handleCreateSimulation = () => {};

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
