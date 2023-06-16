import { NewTodo } from "$components/NewTodo";
import { TodoItem } from "$components/TodoItem";
import { TodoLoader } from "$components/TodoLoader";
import { StackShim } from "@fluentui/react-migration-v8-v9";
import { useCreateTodoMutation, useDeleteTodoMutation, useGetAllTodosQuery, useUpdateTodoMutation } from "./todosApi";
import { getNextOrderId } from "./QueryTodos.utils";
import { ErrorsList, AddTodoError, DeleteTodoError, GetTodosError } from "$components/Errors";

export function QueryTodos() {
  const {
    data: todos,
    isLoading: isLoadingTodos,
    isSuccess: hasTodosData,
    isError: hasTodosGetError,
    refetch: refetchTodos,
  } = useGetAllTodosQuery();

  const [addTodo, { isError: hasTodosAddError, isLoading: isAddingTodo, reset: resetAddTodo }] = useCreateTodoMutation();

  const [deleteTodo, { isError: hasTodosDeleteError, reset: resetDeleteTodo }] = useDeleteTodoMutation();

  const [updateTodo] = useUpdateTodoMutation();

  return (
    <>
      <ErrorsList>
        {hasTodosGetError && <GetTodosError action={refetchTodos} />}
        {hasTodosAddError && <AddTodoError action={resetAddTodo} />}
        {hasTodosDeleteError && <DeleteTodoError action={resetDeleteTodo} />}
      </ErrorsList>

      <NewTodo onAdd={(title) => addTodo({ title, order: getNextOrderId(todos) })} disabled={isAddingTodo} />

      <StackShim tokens={{ childrenGap: "1rem" }}>
        {isLoadingTodos && !hasTodosData ? (
          <TodoLoader count={5} />
        ) : (
          todos?.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={(id) => deleteTodo(id)}
              onToggle={({ id, order }, completed) => updateTodo({ id, updates: { completed, order } })}
            />
          ))
        )}
      </StackShim>
    </>
  );
}
