import { PropsWithChildren } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export type ErrorsListProps = PropsWithChildren<{}>;

export function ErrorsList({ children }: ErrorsListProps) {
  return <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{children}</div>;
}
