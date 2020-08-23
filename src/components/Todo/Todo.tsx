import React, { useState, useEffect } from 'react';
import { TodoItemInterface, DeadlineWarningInterface } from "../../interfaces";
import ClearIcon from '@material-ui/icons/Clear';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { IconButton, TextField, Checkbox, Tooltip } from '@material-ui/core';
import { differenceInSeconds } from 'date-fns'
import { ENTER_KEY, WARNING_TIME } from "../../helper/constants";
import { useStyles } from "./styles";

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
          <DeadlineWarning deadline={todo.deadline} classes={classes} />
          : null
        }
      </div>
    </>
  );
}

const DeadlineWarning = (props: DeadlineWarningInterface): JSX.Element | null => {
  const { deadline, classes } = props;
  const [timeDifferenceState, setTimeDifferenceState] = useState(differenceInSeconds(new Date(deadline), new Date()));
  let realTimeDifference = differenceInSeconds(new Date(deadline), new Date());

  useEffect(() => {
    setTimeDifferenceState(realTimeDifference);
    const intervalID = setInterval(() => {
      // eslint-disable-next-line
      realTimeDifference = realTimeDifference - 3;
      if (realTimeDifference < 0) {
        clearInterval(intervalID);
        setTimeDifferenceState(realTimeDifference);
      }
    }, 3000);

    return function cleanup() {
      clearInterval(intervalID);
    };
  }, [deadline]);

  if (timeDifferenceState >= 0 && timeDifferenceState < WARNING_TIME) {
    return (
      <div className={[classes.warningContainer, classes.warning].join(" ")}>
        <WarningRoundedIcon />
        <span>Soon to expired !</span>
      </div>
    );
  } else if (timeDifferenceState < 0) {
    return (
      <div className={[classes.warningContainer, classes.error].join(" ")}>
        <ErrorRoundedIcon />
        <span>This item is not done yet !!!</span>
      </div>
    );
  } else return null;
}

export default Todo;
