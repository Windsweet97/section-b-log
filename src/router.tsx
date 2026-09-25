import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const basepath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    ...(basepath !== "/" ? { basepath } : {}),
  });
}
