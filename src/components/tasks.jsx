import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Task } from "./task";
import { AddTask } from "./addTask";
import "./tasks.scss";
import { useContext } from "react";
import { dataContext } from "../Providers/dataProvider";

export const Tasks = (props) => {
  const { tasks } = useContext(dataContext);
  const data = tasks.filter(
    (item) => item.isCompleted === (props.type !== "To Do")
  );
  return (
    <Box sx={{ width: "100%" }} className="stack">
      {data.length > 0 && (
        <>
          <div className="tasks-heading">
            <Typography variant="h7" noWrap>
              {props.type}
            </Typography>
            {props.type === "To Do" && <AddTask />}
          </div>

          <div className="stack-inner">
            {data.map((t, i) => (
              <Task type={props.type} task={t} />
            ))}
          </div>
        </>
      )}
    </Box>
  );
};
