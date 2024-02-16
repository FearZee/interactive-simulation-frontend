import "./App.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./mantine/theme.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
