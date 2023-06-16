import { StackShim } from "@fluentui/react-migration-v8-v9";
import { TodoItem } from "$components/TodoItem";
import { NewTodo } from "$components/NewTodo";

import { TodoApi } from "./TodoApi";
import { useEffect, useState } from "react";
import { Todo } from "$models/Todo";

export function AxiosTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function getAllTodos() {
    TodoApi.getAllTodos().then((todos) => {
      setTodos(todos.sort((a, b) => a.order - b.order));
    });
  }

  // Fetch all the todos on mount
  useEffect(() => {
    getAllTodos();
  }, []);

  // Handle deletion of a todo
  function handleDelete(id: string) {
    TodoApi.deleteTodo(id).then(() => {
      // Refetch all todos
      getAllTodos();
    });
  }

  // Handle adding a new todo
  function handleAdd(title: string) {
    TodoApi.createTodo({
      title,
      completed: false,
      order: todos.length + 1,
    }).then(() => {
      // Refetch all todos
      getAllTodos();
    });
  }

  // Handle changing the completion status of a todo
  function handleTodoStatusChange({ id, order }: Todo, completed: boolean) {
    TodoApi.updateTodo(id, { completed, order }).then(() => {
      // Refetch all todos
      getAllTodos();
    });
  }

  return (
    <>
      <NewTodo onAdd={handleAdd} />

      <StackShim tokens={{ childrenGap: "1rem" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onToggle={handleTodoStatusChange}
          />
        ))}
      </StackShim>
    </>
  );
}
