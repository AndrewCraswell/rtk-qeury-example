import { Alert } from "@fluentui/react-components/unstable";
import { ErrorProps } from "./types";

export function AddTodoError({ action }: ErrorProps) {
  return (
    <Alert intent="error" action="Retry" onClick={action}>
      There was an error when trying to add the new todo.
    </Alert>
  );
}
