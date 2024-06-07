import React from "react";
import "./addTask.css";
import Button from "@mui/material/Button";

import "./addTask.css";
import { dataContext } from "../Providers/dataProvider";
export const AddTask = () => {
  const [title, SetTitle] = React.useState("");

  const { createTask } = React.useContext(dataContext);

  return (
    <div>
      <input
        value={title}
        className="add-input"
        placeholder="Title for new task"
        onChange={(e) => {
          SetTitle(e.target.value);
        }}
      />
      <Button
        sx={{ border: "1px solid #7c7c7d", color: "white" }}
        variant="outlined"
        className="add-outer"
        size="small"
        onClick={() => {
          createTask({
            title,
            addedDate: Date.now(),
            isCompleted: false,
          });
          SetTitle("");
        }}
      >
        Add
      </Button>
    </div>
  );
};
