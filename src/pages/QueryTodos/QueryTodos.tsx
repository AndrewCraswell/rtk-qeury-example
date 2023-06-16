import { NewTodo } from "$components/NewTodo";
import { TodoItem } from "$components/TodoItem";
import { TodoLoader } from "$components/TodoLoader";
import { Todo } from "$models/Todo";
import { Alert } from "@fluentui/react-components/unstable";
import { useBoolean } from "@fluentui/react-hooks";
import { StackShim } from "@fluentui/react-migration-v8-v9";

const todos: Todo[] = [];
const isAddingTodo = false;
const hasTodosData = false;
const isLoadingTodos = true;

export function QueryTodos() {
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

  // Handle deletion of a todo
  function handleDelete(id: string) {}

  // Handle adding a new todo
  function handleAdd(title: string) {
    //const maxOrder = todos.reduce((max, todo) => Math.max(max, todo.order), 0);
  }

  // Handle changing the completion status of a todo
  function handleTodoStatusChange({ id, order }: Todo, completed: boolean) {}

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
