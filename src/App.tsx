import "./App.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./mantine/theme.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";

function App() {
    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}

export default App;