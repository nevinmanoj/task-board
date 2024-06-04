import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./pages/home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { DataProvider } from "./Providers/dataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </DataProvider>
  </React.StrictMode>
);
