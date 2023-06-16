import { Todo } from "$models/Todo";

export type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
};
