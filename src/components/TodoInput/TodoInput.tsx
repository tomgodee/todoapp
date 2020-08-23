import React, { useState } from 'react';
import { TodoInputInterface } from "../../interfaces";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ENTER_KEY } from "../../helper/constants";
import { useStyles } from "./styles";

const TodoInput = (props: TodoInputInterface) => {
  const classes = useStyles();
  const [text, setText] = useState("");

  const handleChange = (text: string): void => {
    setText(text);
  };

  const handleClick = (): void => {
    if (text !== "") {
      props.addTodo(text);
      setText("");
    }
  };

  const handleKeyDown = (keyCode: number): void => {
    if (keyCode === ENTER_KEY && text !== "") {
      props.addTodo(text);
      setText("");
    }
  };

  return (
    <div className={classes.addTodo}>
      <Button variant="outlined" color="secondary" onClick={() => handleClick()}>Add</Button>
      <label htmlFor="addTodo"></label>
      <TextField
        id="addTodo" label="Todo" variant="outlined"
        color="secondary"
        className={classes.input}
        inputProps={{ maxLength: 255 }}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.keyCode)}
      />
    </div>
  )
};

export default TodoInput;
