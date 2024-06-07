import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDate } from "../utils/dateFormatter";
import "./task.scss";
import { useContext } from "react";
import { dataContext } from "../Providers/dataProvider";

export const Task = ({ task, type }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [editable, setEditable] = React.useState(false);
  const { modifyTask, deleteTask } = useContext(dataContext);
  const [title, setTitle] = React.useState(task.title);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="task">
      <div>
        {editable ? (
          <>
            <input
              value={title}
              className="task-title-input"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </>
        ) : (
          <div className="task-title">{task.title}</div>
        )}
        <div className="task-dates">
          <div>
            <span>Added On</span>
            <br />
            {formatDate(task.addedDate)}
          </div>
          {task.isCompleted && (
            <div className="completed">
              <span>Completed On</span>
              <br />
              {formatDate(task.completionDate)}
            </div>
          )}
        </div>
      </div>
      <div className="task-menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            key="mark"
            onClick={() => {
              modifyTask(
                {
                  ...task,
                  isCompleted: type === "To Do",
                  completionDate: type === "To Do" ? Date.now() : undefined,
                },
                task._id
              );
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">
              {type === "To Do" ? "Mark as Complete" : "Mark as To Do"}
            </Typography>
          </MenuItem>
          <MenuItem
            key="edit"
            onClick={() => {
              setEditable(!editable);
              setTitle(task.title);
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">
              {editable ? "Discard Edit" : "Edit"}
            </Typography>
          </MenuItem>
          {editable && title != task.title && (
            <MenuItem
              key="edit"
              onClick={() => {
                setEditable(!editable);
                modifyTask(
                  {
                    ...task,
                    title,
                  },
                  task._id
                );
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">Save Edit</Typography>
            </MenuItem>
          )}
          <MenuItem
            key="delete"
            onClick={() => {
              deleteTask(task._id);
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">Delete</Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
