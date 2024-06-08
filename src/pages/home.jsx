import { Topbar } from "../components/topbar";
import { Tasks } from "../components/tasks";
import { AddTask } from "../components/addTask";
import * as React from "react";
import Box from "@mui/material/Box";
import { Loading } from "../components/loading";

import "./home.css";
import { useContext } from "react";
import { dataContext } from "../Providers/dataProvider";

export const Home = () => {
  const { loading, jwtToken } = useContext(dataContext);
  return (
    <div className="outer">
      <Box sx={{ my: 4 }}>
        <Topbar />

        {loading ? (
          <Loading />
        ) : (
          jwtToken && (
            <div className="tasks-outer">
              <Tasks type={"To Do"} />

              <Tasks type={"Completed"} />
            </div>
          )
        )}
      </Box>
    </div>
  );
};
