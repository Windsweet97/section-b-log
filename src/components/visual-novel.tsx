import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { isNodeId, SCENES, type NodeId, type SceneChoice } from "@/lib/scenes";
import { useArgStore } from "@/lib/arg-store";
import { argAudio } from "@/lib/audio";

export function VisualNovel({ node }: { node: string }) {
  const startId: NodeId = isNodeId(node) ? node : "start";
  const [sceneId, setSceneId] = useState<NodeId>(startId);
  const [line, setLine] = useState(0);
  const startGlitch = useArgStore((s) => s.startGlitch);
  const router = useRouter();

  useEffect(() => {
    setSceneId(startId);
    setLine(0);
  }, [startId]);

  const scene = SCENES[sceneId];
  const atEnd = line >= scene.lines.length - 1;
  const current = scene.lines[Math.min(line, scene.lines.length - 1)];

  const advance = () => {
    argAudio.modemBlip();
    if (!atEnd) setLine((n) => n + 1);
  };

  const pick = (choice: SceneChoice) => {
    argAudio.unlock();
    if ("href" in choice) {
      startGlitch({
        message: `>> ROUTING: ${choice.label.toUpperCase()}`,
        href: choice.href,
      });
      return;
    }
    setSceneId(choice.node);
    setLine(0);
    router.history.push(`/wired?node=${choice.node}`);
  };

  const artStyle = useMemo(
    () => ({ backgroundImage: `url(${scene.bg})` }),
    [scene.bg],
  );

  return (
    <div className="vn-page">
      <div className="vn-stage">
        <div className="title-bar" style={{ marginBottom: 0 }}>
          <span>
            Netscape Navigator - [LAYER_NODE //{scene.title}]
          </span>
          <div className="win-buttons">
            <button
              type="button"
              aria-label="Return to SECTION_B"
              onClick={() =>
                startGlitch({
                  message: ">> RETURNING TO SECTION_B...",
                  href: "/B.html",
                })
              }
            >
              X
            </button>
          </div>
        </div>
        <div className="vn-frame">
          <button
            type="button"
            className="vn-art w-full border-0 p-0 text-left"
            style={artStyle}
            onClick={advance}
            aria-label="Advance dialogue"
          >
            <div className="vn-meta">
              {scene.title} // {scene.location}
            </div>
          </button>
          <div className="vn-dialog">
            {current?.speaker ? (
              <div className="vn-speaker">{current.speaker}</div>
            ) : (
              <div className="vn-speaker">narration</div>
            )}
            <p className="vn-text">{current?.text}</p>
            {atEnd ? (
              <div className="vn-choices">
                {scene.choices.map((choice) => (
                  <button
                    key={choice.label}
                    type="button"
                    className="vn-choice"
                    onClick={() => pick(choice)}
                  >
                    {`> ${choice.label}`}
                  </button>
                ))}
              </div>
            ) : (
              <p className="vn-hint">tap the scene to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
