import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useArgStore } from "@/lib/arg-store";
import { argAudio } from "@/lib/audio";

export const Route = createFileRoute("/section-a")({
  component: SectionAPage,
});

const LINES = [
  "> LAYER: CONSCIOUSNESS",
  "> STATUS: BLEEDING",
  "> REALITY: 404",
  "",
  "The surface was a lie you told yourself so the rest of you could keep working.",
  "",
  "Everyone thinks SECTION_B is a backup. It is the bottom.",
  "I built a retro interface so I could look at something familiar",
  "while the rest of my mind unravels.",
  "",
  "The girl is still standing in the node.",
  "Do not disconnect the power supply.",
  "",
  "Present day. Present time.",
  "Close the world. Open the next.",
];

function SectionAPage() {
  const [shown, setShown] = useState(1);
  const startGlitch = useArgStore((s) => s.startGlitch);
  const done = shown >= LINES.length;

  useEffect(() => {
    argAudio.unlock();
    if (done) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), 70);
    return () => window.clearTimeout(t);
  }, [shown, done]);

  return (
    <div
      className="wired-page"
      onClick={() => {
        argAudio.modemBlip();
        setShown(LINES.length);
      }}
    >
      <div className="wired-log">
        <p className="text-glitch-red text-xs tracking-[0.2em]">SECTION_A.LOG // THE WIRED</p>
        <div className="mt-6">
          {LINES.slice(0, shown).map((line, i) => (
            <div key={`${i}-${line}`}>{line.length ? line : "\u00a0"}</div>
          ))}
          {!done ? <span className="text-sprite-yellow">_</span> : null}
        </div>
        {done ? (
          <div className="vn-choices mt-8">
            <button
              type="button"
              className="vn-choice"
              onClick={() =>
                startGlitch({
                  message: ">> RETURNING TO INNER SURFACE...",
                  href: "/?layer=inner",
                })
              }
            >
              {"> Return to SECTION_B (inner)"}
            </button>
            <button
              type="button"
              className="vn-choice"
              onClick={() =>
                startGlitch({
                  message: ">> CONNECTING TO GOD OF THE WIRED...",
                  href: "/wired?node=god_of_wired",
                })
              }
            >
              {"> Speak to the girl in the node"}
            </button>
            <button
              type="button"
              className="vn-choice"
              onClick={() =>
                startGlitch({
                  message: ">> OPENING KMT.DAT...",
                  href: "/kmt",
                })
              }
            >
              {"> Execute KMT.DAT"}
            </button>
          </div>
        ) : (
          <p className="vn-hint mt-6">tap to skip</p>
        )}
      </div>
    </div>
  );
}
