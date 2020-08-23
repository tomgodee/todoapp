export interface TodoInterface {
  content: string,
  done: boolean,
  key: number,
  deadline?: string
};

export interface TodoItemInterface {
  deleteTodo: (id: number) => void,
  toggleTodo: (key: number) => void,
  updateTodo: (text: string, key: number) => void,
  changeDeadlineTodo: (time: string, key: number) => void,
  todo: TodoInterface
}

export interface DeadlineWarningInterface {
  deadline: string,
}

export interface TodoInputInterface {
  addTodo: (text: string) => void
}
