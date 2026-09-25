import { useEffect, useRef, useState } from "react";
import { useArgStore, type Layer } from "@/lib/arg-store";

type MenuKey = "file" | "go" | "bookmarks" | "options" | "help" | null;

type Props = {
  title: string;
  url: string;
  onJump: (node: string) => void;
  onClose: () => void;
  children: React.ReactNode;
};

export function NetscapeWindow({ title, url, onJump, onClose, children }: Props) {
  const [menu, setMenu] = useState<MenuKey>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const muted = useArgStore((s) => s.muted);
  const setMuted = useArgStore((s) => s.setMuted);
  const innerUnlocked = useArgStore((s) => s.innerUnlocked);
  const layer = useArgStore((s) => s.layer);
  const startGlitch = useArgStore((s) => s.startGlitch);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const peel = (next: Layer) => {
    setMenu(null);
    startGlitch({
      message:
        next === "inner"
          ? ">> PEELING SURFACE BUFFER..."
          : ">> RESTORING GEOCITIES FACE...",
      thenLayer: next,
    });
  };

  return (
    <div className="netscape-window">
      <div className="title-bar">
        <span>{title}</span>
        <div className="win-buttons">
          <button type="button" aria-label="Minimize" tabIndex={-1}>
            _
          </button>
          <button type="button" aria-label="Maximize" tabIndex={-1}>
            □
          </button>
          <button type="button" aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>

      <div className="menu-bar" ref={barRef}>
        <button
          type="button"
          className="menu-item"
          data-open={menu === "file"}
          onClick={() => setMenu(menu === "file" ? null : "file")}
        >
          <u>F</u>ile
        </button>
        <span className="menu-item" aria-hidden="true">
          <u>E</u>dit
        </span>
        <span className="menu-item" aria-hidden="true">
          <u>V</u>iew
        </span>
        <button
          type="button"
          className="menu-item"
          data-open={menu === "go"}
          onClick={() => setMenu(menu === "go" ? null : "go")}
        >
          <u>G</u>o
        </button>
        <button
          type="button"
          className="menu-item"
          data-open={menu === "bookmarks"}
          onClick={() => setMenu(menu === "bookmarks" ? null : "bookmarks")}
        >
          <u>B</u>ookmarks
        </button>
        <button
          type="button"
          className="menu-item"
          data-open={menu === "options"}
          onClick={() => setMenu(menu === "options" ? null : "options")}
        >
          <u>O</u>ptions
        </button>
        <button
          type="button"
          className="menu-item"
          data-open={menu === "help"}
          onClick={() => setMenu(menu === "help" ? null : "help")}
        >
          <u>H</u>elp
        </button>

        {menu === "file" ? (
          <div className="menu-drop" style={{ left: 4 }}>
            <button type="button" onClick={() => peel("surface")}>
              Restore Geocities face
            </button>
            <button type="button" onClick={() => peel("inner")}>
              Open true inner surface
            </button>
            <button type="button" onClick={onClose}>
              Exit / crash node
            </button>
          </div>
        ) : null}

        {menu === "go" ? (
          <div className="menu-drop" style={{ left: 120 }}>
            <button type="button" onClick={() => onJump("start")}>
              Layer 00: Classroom
            </button>
            <button type="button" onClick={() => onJump("rooftop")}>
              Layer 01: Rooftop
            </button>
            <button type="button" onClick={() => onJump("boot_pc")}>
              Layer 02: Terminal
            </button>
            <button type="button" onClick={() => onJump("deep_wired_entry")}>
              Layer 03: Deep Wired
            </button>
          </div>
        ) : null}

        {menu === "bookmarks" ? (
          <div className="menu-drop" style={{ left: 160 }}>
            <button type="button" onClick={() => peel(layer === "inner" ? "surface" : "inner")}>
              SECTION_B.LOG
            </button>
            <button
              type="button"
              onClick={() =>
                startGlitch({
                  message: ">> CONNECTING TO SECTION_A...",
                  href: "/section-a",
                })
              }
            >
              SECTION_A.LOG
            </button>
            {innerUnlocked ? (
              <button
                type="button"
                onClick={() =>
                  startGlitch({
                    message: ">> OPENING KMT.DAT...",
                    href: "/kmt",
                  })
                }
              >
                KMT.DAT
              </button>
            ) : null}
          </div>
        ) : null}

        {menu === "options" ? (
          <div className="menu-drop" style={{ left: 240 }}>
            <button type="button" onClick={() => setMuted(!muted)}>
              {muted ? "Unmute carrier" : "Mute carrier"}
            </button>
          </div>
        ) : null}

        {menu === "help" ? (
          <div className="menu-drop" style={{ left: 300 }}>
            <button type="button" onClick={() => setMenu(null)}>
              Terminal: HELP, LAIN, CONNECT
            </button>
            <button type="button" onClick={() => setMenu(null)}>
              The counter is not only a counter.
            </button>
          </div>
        ) : null}
      </div>

      <div className="url-bar">
        <label htmlFor="location-bar">Location:</label>
        <input
          id="location-bar"
          type="text"
          className="url-input"
          value={url}
          readOnly
        />
      </div>

      <div className="web-body">{children}</div>
    </div>
  );
}
