import {
  Card,
  CardHeader,
  Checkbox,
  Body1,
  Caption1,
  Button,
} from "@fluentui/react-components";
import { Delete24Regular } from "@fluentui/react-icons";
import { StackShim } from "@fluentui/react-migration-v8-v9";
import { TodoItemProps } from "./TodoItem.types";
import { useStyles } from "./TodoItem.styles";

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { completed, title, id, order } = todo;
  const classes = useStyles();

  function handleToggle() {
    onToggle(todo, !completed);
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <Card size="small" className={classes.card}>
      <CardHeader
        image={<Checkbox checked={completed} onChange={handleToggle} />}
        header={<Body1 strikethrough={completed}>Task #{order}</Body1>}
        description={<Caption1 strikethrough={completed}>{title}</Caption1>}
        action={
          <StackShim horizontal>
            <Button
              appearance="transparent"
              icon={<Delete24Regular />}
              onClick={handleDelete}
            />
          </StackShim>
        }
      />
    </Card>
  );
}
