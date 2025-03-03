import { ReactElement, ComponentType } from "react";

export type Route = {
  path: string;
  component: React.ReactElement;
  layout?: ComponentType<{ children: ReactElement }> | null;
  isProtected?: boolean; // Requires authentication
  isPublic?: boolean; // Only accessible when not authenticated
};

export type PrivateRouteProps = {
  children: React.ReactNode;
};
