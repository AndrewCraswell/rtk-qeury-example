import { StackShim } from "@fluentui/react-migration-v8-v9";
import { TodoItem } from "$components/TodoItem";
import { NewTodo } from "$components/NewTodo";
import { TodoApi } from "./TodoApi";
import { useEffect, useState } from "react";
import { useBoolean } from "@fluentui/react-hooks";
import { Todo } from "$models/Todo";
import { TodoLoader } from "$components/TodoLoader";
import { Alert } from "@fluentui/react-components/unstable";

export function AxiosTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Loading status indicators
  const [
    isLoadingTodos,
    { setTrue: setTodosLoading, setFalse: setTodosLoaded },
  ] = useBoolean(false);
  const [hasTodosData, { setTrue: setTodosHasData }] = useBoolean(false);
  const [
    isAddingTodo,
    { setTrue: setAddingTodo, setFalse: setTodoDoneAdding },
  ] = useBoolean(false);

  // Error statuses
  const [
    hasTodosGetError,
    { setTrue: setTodosGetError, setFalse: dismissTodosGetError },
  ] = useBoolean(false);
  const [
    hasTodosAddError,
    { setTrue: setTodosAddError, setFalse: dismissTodosAddError },
  ] = useBoolean(false);
  const [
    hasTodosDeleteError,
    { setTrue: setTodosDeleteError, setFalse: dismisTodosDeleteError },
  ] = useBoolean(false);

  // Fetch the list of all todos
  async function getAllTodos() {
    setTodosLoading();
    TodoApi.getAllTodos()
      .then((todos) => {
        setTodos(todos.sort((a, b) => a.order - b.order));
        setTodosHasData();
      })
      .catch(() => {
        console.log("GET ERROR");
        setTodosGetError();
      })
      .finally(() => setTodosLoaded());
  }

  // Handle deletion of a todo
  function handleDelete(id: string) {
    TodoApi.deleteTodo(id)
      .then(() => {
        // Refetch all todos
        getAllTodos();
      })
      .catch(() => setTodosDeleteError());
  }

  // Handle adding a new todo
  function handleAdd(title: string) {
    const maxOrder = todos.reduce((max, todo) => Math.max(max, todo.order), 0);

    setAddingTodo();

    TodoApi.createTodo({
      title,
      completed: false,
      order: maxOrder + 1,
    })
      .then(() => {
        // Refetch all todos
        getAllTodos().finally(() => {
          setTodoDoneAdding();
        });
      })
      .catch(() => setTodosAddError())
      .finally(() => {
        setTodoDoneAdding();
      });
  }

  // Handle changing the completion status of a todo
  function handleTodoStatusChange({ id, order }: Todo, completed: boolean) {
    TodoApi.updateTodo(id, { completed, order }).then(() => {
      // Refetch all todos
      getAllTodos();
    });
  }

  // Fetch all the todos on component mount
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {hasTodosGetError && (
          <Alert intent="error" action="Dismiss" onClick={dismissTodosGetError}>
            There was an error fetching the list of todos.
          </Alert>
        )}

        {hasTodosAddError && (
          <Alert intent="error" action="Dismiss" onClick={dismissTodosAddError}>
            There was an error when trying to add the new todo.
          </Alert>
        )}

        {hasTodosDeleteError && (
          <Alert
            intent="error"
            action="Dismiss"
            onClick={dismisTodosDeleteError}
          >
            There was an error when trying to delete the todo.
          </Alert>
        )}
      </div>

      <NewTodo onAdd={handleAdd} disabled={isAddingTodo} />

      <StackShim tokens={{ childrenGap: "1rem" }}>
        {isLoadingTodos && !hasTodosData ? (
          <TodoLoader count={5} />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onToggle={handleTodoStatusChange}
            />
          ))
        )}
      </StackShim>
    </>
  );
}
