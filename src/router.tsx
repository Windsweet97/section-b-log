import { createRouter, createBrowserHistory } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

const LAB_PREFIX = "/lab1";

function stripLab(path: string): string {
  if (path === LAB_PREFIX) return "/";
  if (path.startsWith(`${LAB_PREFIX}/`)) return path.slice(LAB_PREFIX.length) || "/";
  return path;
}

function addLab(path: string): string {
  if (path.startsWith("http") || path.startsWith(LAB_PREFIX)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${LAB_PREFIX}${normalized}`;
}

function createLabHistory() {
  const inner = createBrowserHistory();
  return new Proxy(inner, {
    get(target, prop, receiver) {
      if (prop === "location") {
        const loc = target.location;
        return { ...loc, pathname: stripLab(loc.pathname) };
      }
      if (prop === "push") {
        return (path: string, state?: unknown, opts?: unknown) =>
          target.push(addLab(path), state, opts);
      }
      if (prop === "replace") {
        return (path: string, state?: unknown, opts?: unknown) =>
          target.replace(addLab(path), state, opts);
      }
      if (prop === "createHref") {
        return (href: string) => target.createHref(addLab(href));
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

export function getRouter() {
  const onLab =
    typeof window !== "undefined" && window.location.pathname.startsWith(LAB_PREFIX);
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    ...(onLab ? { history: createLabHistory() } : {}),
  });
}
