import React, { useState } from "react";
import Todo from "../../components/Todo/Todo";
import TodoInput from "../../components/TodoInput/TodoInput";
import { TodoInterface } from "../../interfaces";
import { useStyles } from "./styles";

const initialState: TodoInterface[] = [
  {
    content: 'Go to bed',
    done: false,
    key: 1,
  },
  {
    content: 'Finish this project',
    done: true,
    key: 2,
  }
];

const TodoList = (): JSX.Element => {
  const classes = useStyles();
  const [todos, setTodos] = useState(initialState);

  const addTodo = (text: string): void => {
    const nextKey = Math.max(...todos.map(todo => todo.key)) + 1;
    const newTodo: TodoInterface = { content: text, done: false, key: nextKey };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (key: number): void => {
    const newTodos = todos.filter(todo => todo.key !== key);
    setTodos(newTodos);
  };

  const toggleTodo = (key: number): void => {
    const newTodos = todos.map(todo => {
      if (todo.key === key) todo.done = !todo.done;
      return todo;
    });
    setTodos(newTodos);
  };

  const updateTodo = (text: string, key: number): void => {
    const newTodos = todos.map(todo => {
      if (todo.key === key) todo.content = text;
      return todo;
    });
    setTodos(newTodos);
  };

  const changeDeadlineTodo = (time: string, key: number): void => {
    const newTodos = todos.map(todo => {
      if (todo.key === key) todo.deadline = time;
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className={classes.todoList}>
      <TodoInput addTodo={addTodo} />
      {todos.map(todo =>
        <Todo
          key={todo.key}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
          changeDeadlineTodo={changeDeadlineTodo}
        ></Todo>
      )}
    </div>
  );
};

export default TodoList;
