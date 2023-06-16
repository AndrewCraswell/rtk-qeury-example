import { Alert } from "@fluentui/react-components/unstable";
import { ErrorProps } from "./types";

export function DeleteTodoError({ action }: ErrorProps) {
  return (
    <Alert intent="error" action="Dismiss" onClick={action}>
      There was an error when trying to delete the todo.
    </Alert>
  );
}
