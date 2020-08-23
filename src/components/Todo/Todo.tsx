import React, { useState } from 'react';
import { TodoItemInterface } from "../../interfaces";
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton, TextField, Checkbox, Tooltip } from '@material-ui/core';
import { ENTER_KEY } from "../../helper/constants";
import { useStyles } from "./styles";
import DeadlineWarning from "../DeadlineWarning/DeadlineWarning";

const Todo = (props: TodoItemInterface) => {
  const classes = useStyles();

  const { todo, deleteTodo, toggleTodo, updateTodo, changeDeadlineTodo } = props;
  const [isEditable, setIsEditable] = useState(false);

  const handleDelete = (key: number): void => {
    deleteTodo(key);
  };

  const handleToggle = (key: number): void => {
    toggleTodo(key);
  };

  const handleDoubleClick = (): void => {
    if (todo.content !== "" && !isEditable) setIsEditable(!isEditable);
  };

  const handleChange = (text: string, key: number): void => {
    updateTodo(text, key);
  };

  const handleKeyDown = (keyCode: number, key: number): void => {
    if (keyCode === ENTER_KEY && todo.content !== "") {
      updateTodo(todo.content, key);
      setIsEditable(!isEditable);
    }
  };

  const handleChangeDeadline = (time: string): void => {
    changeDeadlineTodo(time, todo.key);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.contentContainer}>
          <Checkbox
            checked={todo.done}
            onChange={() => handleToggle(todo.key)}
            name="Done"
            inputProps={{ "aria-label": "checkbox" }}
          />
          <span className={classes.content} onDoubleClick={() => handleDoubleClick()}>
            {isEditable ?
              <Tooltip title="Enter to confirm" placement="top">
                <TextField
                  className={classes.input}
                  color="secondary"
                  inputProps={{ maxLength: 255 }}
                  error={todo.content === ""}
                  variant="outlined"
                  value={todo.content}
                  onChange={(e) => handleChange(e.target.value, todo.key)}
                  onKeyDown={(e) => handleKeyDown(e.keyCode, todo.key)}
                />
              </Tooltip>
              :
              <Tooltip title="Double click to edit" placement="top">
                <span className={todo.done ? classes.done : ""}>
                  {todo.content}
                </span>
              </Tooltip>
            }
          </span>
        </div>

        <IconButton className={classes.deleteIcon} aria-label="delete" onClick={() => handleDelete(todo.key)}>
          <ClearIcon />
        </IconButton>

        <div>
          <TextField
            className={classes.timePicker}
            id="deadline"
            type="datetime-local"
            value={todo.deadline || ""}
            onChange={(e) => handleChangeDeadline(e.target.value)}
          />
        </div>

        {todo.deadline && !todo.done ?
          <DeadlineWarning deadline={todo.deadline} />
          : null
        }
      </div>
    </>
  );
}

export default Todo;
