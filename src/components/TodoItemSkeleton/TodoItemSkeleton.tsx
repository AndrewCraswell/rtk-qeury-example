import { useStyles as useTodoItemStyles } from "$components/TodoItem/TodoItem.styles";
import { Card, CardHeader, SkeletonItem } from "@fluentui/react-components";

export function TodoItemSkeleton() {
  const todoItemClasses = useTodoItemStyles();

  return (
    <Card size="small" className={todoItemClasses.card}>
      <CardHeader
        image={
          <SkeletonItem
            shape="square"
            style={{ height: 17, width: 17, margin: 8 }}
          />
        }
        header={
          <SkeletonItem style={{ height: 19, width: 50, marginBottom: 5 }} />
        }
        description={<SkeletonItem style={{ height: 16, width: 175 }} />}
        action={
          <SkeletonItem
            shape="rectangle"
            style={{ height: 20, width: 20, margin: 6 }}
          />
        }
      />
    </Card>
  );
}
