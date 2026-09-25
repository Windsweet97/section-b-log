import { createFileRoute } from "@tanstack/react-router";
import { VisualNovel } from "@/components/visual-novel";

type WiredSearch = { node: string };

export const Route = createFileRoute("/wired")({
  validateSearch: (search: Record<string, unknown>): WiredSearch => ({
    node: typeof search.node === "string" && search.node.length > 0 ? search.node : "start",
  }),
  component: WiredPage,
});

function WiredPage() {
  const { node } = Route.useSearch();
  return <VisualNovel node={node} />;
}
