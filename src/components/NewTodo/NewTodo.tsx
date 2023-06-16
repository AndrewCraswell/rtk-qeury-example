import { Input, Button } from "@fluentui/react-components";
import { StackShim } from "@fluentui/react-migration-v8-v9";
import { useState } from "react";
import { NewTodoProps } from "./NewTodo.types";

export function NewTodo({ onAdd, disabled }: NewTodoProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    onAdd(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <StackShim horizontal tokens={{ childrenGap: "1rem", padding: "1rem 0" }}>
        <Input
          placeholder="Task description"
          onChange={(ev, data) => setTitle(data.value)}
          value={title}
        />
        <Button appearance="primary" type="submit" disabled={disabled}>
          Add
        </Button>
      </StackShim>
    </form>
  );
}
