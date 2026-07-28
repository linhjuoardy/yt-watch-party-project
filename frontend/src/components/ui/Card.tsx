import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return <div>{children}</div>;
}