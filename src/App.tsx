import { CssBaseline } from "@mui/material";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import SnackbarProvider from "./providers/SnakBarProvider";
import Theme from "./providers/Theme";

import { RouterProvider } from "react-router-dom";
import SocketHubConnectionProvider from "./providers/SocketHubConnectionProvider";
import routes from "./Routes";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";

function App() {
  return (
    <>
      <Theme>
        <CssBaseline />
        <SnackbarProvider>
          <SocketHubConnectionProvider>
            <ReactQueryProvider>
              <RouterProvider router={routes} />
            </ReactQueryProvider>
          </SocketHubConnectionProvider>
        </SnackbarProvider>
      </Theme>
    </>
  );
}

export default App;
