import { ReactElement, ComponentType } from "react";

export type Route = {
  path: string;
  component: React.ReactElement;
  layout?: ComponentType<{ children: ReactElement }> | null;
};

export type PrivateRouteProps = {
  children: React.ReactNode;
};
