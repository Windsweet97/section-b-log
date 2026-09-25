import { useEffect } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { argAudio } from "@/lib/audio";
import { useArgStore } from "@/lib/arg-store";
import { SectionB } from "@/components/section-b";

type IndexSearch = { layer?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => ({
    layer: typeof search.layer === "string" ? search.layer : undefined,
  }),
  component: Home,
});

export function Home() {
  const { layer } = useSearch({ strict: false }) as IndexSearch;
  const entered = useArgStore((s) => s.entered);
  const enter = useArgStore((s) => s.enter);
  const unlockInner = useArgStore((s) => s.unlockInner);

  useEffect(() => {
    if (layer === "inner") unlockInner();
  }, [layer, unlockInner]);

  if (!entered) {
    return (
      <div className="boot-screen">
        <div className="boot-panel">
          <p className="boot-line">{" > ATDT 1994"}</p>
          <p className="boot-line">{" > CARRIER DETECTED @ 56k"}</p>
          <p className="boot-line">{" > PROTOCOL: SECTION_B"}</p>
          <h1 className="mt-4">SECTION_B.LOG</h1>
          <p className="subtitle mt-2">subconscious buffer // 1994</p>
          <p className="boot-line mt-4">
            {" > Present day, present time."}
            <br />
            {" > Close the world, open the next."}
          </p>
          <button
            type="button"
            className="dial-btn"
            onClick={() => {
              argAudio.unlock();
              enter();
            }}
          >
            [ DIAL IN ]
          </button>
        </div>
      </div>
    );
  }

  return <SectionB />;
}
