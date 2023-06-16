import { TodoItemSkeleton } from "$components/TodoItemSkeleton";

export type TodoLoaderProps = {
  count?: number;
};

export function TodoLoader({ count = 3 }: TodoLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{ opacity: 1 - index * 0.2 }}>
          <TodoItemSkeleton />
        </div>
      ))}
    </>
  );
}
