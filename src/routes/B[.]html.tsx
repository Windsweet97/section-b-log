import { createFileRoute } from "@tanstack/react-router";
import { Home } from "./index";

type IndexSearch = { layer?: string };

/** Static-host alias so ~/www/B.html boots the same home as `/`. */
export const Route = createFileRoute("/B.html")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => ({
    layer: typeof search.layer === "string" ? search.layer : undefined,
  }),
  component: Home,
});
