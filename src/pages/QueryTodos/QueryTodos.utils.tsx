import { Todo } from "$models/Todo";

export function getNextOrderId(todos?: Todo[]) {
  return (todos?.reduce((max, todo) => Math.max(max, todo.order), 0) ?? 0) + 1;
}
