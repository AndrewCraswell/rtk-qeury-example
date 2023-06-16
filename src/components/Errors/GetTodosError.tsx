import { Alert } from "@fluentui/react-components/unstable";
import { ErrorProps } from "./types";

export function GetTodosError({ action }: ErrorProps) {
  return (
    <Alert intent="error" action="Retry" onClick={action}>
      There was an error fetching the list of todos.
    </Alert>
  );
}
