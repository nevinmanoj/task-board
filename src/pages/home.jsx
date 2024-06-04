import { Topbar } from "../components/topbar";
import * as React from "react";
import Box from "@mui/material/Box";

import "./home.css";

export const Home = () => {
  return (
    <div className="outer">
      <Box sx={{ my: 4 }}>
        <Topbar />
      </Box>
    </div>
  );
};
