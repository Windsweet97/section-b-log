import { useState } from "react";
import { argAudio } from "@/lib/audio";
import { useArgStore } from "@/lib/arg-store";

type Props = {
  onJump: (node: string) => void;
};

export function TerminalShell({ onJump }: Props) {
  const [log, setLog] = useState("> Type 'HELP' or 'CONNECT'");
  const [value, setValue] = useState("");
  const markSecret = useArgStore((s) => s.markSecret);
  const startGlitch = useArgStore((s) => s.startGlitch);
  const innerUnlocked = useArgStore((s) => s.innerUnlocked);

  const run = (raw: string) => {
    const val = raw.trim().toUpperCase();
    argAudio.modemBlip();

    if (val === "HELP") {
      setLog(
        innerUnlocked
          ? "COMMANDS: HELP, LAIN, KNIGHTS, CONNECT, CLEAR\n          DIVE, SURFACE, KMT, WIRED"
          : "COMMANDS: HELP, LAIN, KNIGHTS, CONNECT, CLEAR",
      );
      return;
    }
    if (val === "LAIN") {
      markSecret("lain");
      argAudio.glitch();
      setLog("> LAIN_SYS: Present day, present time. Hahaha...\n> The surface is thinning.");
      return;
    }
    if (val === "KNIGHTS") {
      markSecret("knights");
      setLog("> KNIGHTS: We are everywhere in the sub-layer.");
      return;
    }
    if (val === "CONNECT") {
      setLog("> ESTABLISHING DIRECT WIRED LINK...");
      window.setTimeout(() => onJump("boot_pc"), 400);
      return;
    }
    if (val === "CLEAR") {
      setLog("> TERMINAL CLEARED.");
      return;
    }
    if (val === "DIVE" || val === "INNER" || val === "PEEL") {
      setLog("> SURFACE HASH MISMATCH. PEELING BUFFER...");
      startGlitch({
        message: ">> PEELING SURFACE BUFFER...",
        thenLayer: "inner",
      });
      return;
    }
    if (val === "SURFACE") {
      startGlitch({
        message: ">> RESTORING GEOCITIES FACE...",
        thenLayer: "surface",
      });
      return;
    }
    if (val === "KMT") {
      startGlitch({ message: ">> OPENING KMT.DAT...", href: "/kmt" });
      return;
    }
    if (val === "WIRED" || val === "A" || val === "SECTION_A") {
      startGlitch({ message: ">> CONNECTING TO SECTION_A...", href: "/section-a" });
      return;
    }
    if (val === "ROOFTOP") {
      onJump("rooftop");
      return;
    }
    if (val === "GOD") {
      onJump("god_of_wired");
      return;
    }
    if (val === "SPRITE") {
      setLog("> REFRESH YOUR MIND. 330ml. Ice-cold. The fizz is a carrier tone.");
      return;
    }
    if (val === "WHO") {
      setLog("> If you are reading this, you are already inside the network loop.");
      return;
    }
    if (val === "STATUS") {
      setLog(
        innerUnlocked
          ? "> STATUS: BLEEDING\n> DEPTH: Layer_00 (Surface is the bottom)"
          : "> STATUS: SUSPENDED\n> MODEM: 56k carrier locked",
      );
      return;
    }
    setLog(`> UNKNOWN PROTOCOL: '${val}'. Try 'HELP'.`);
  };

  return (
    <div className="terminal-widget">
      <div className="terminal-output" id="term-out">
        {log}
      </div>
      <div className="terminal-input-line">
        <span aria-hidden="true">{">"}</span>
        <input
          type="text"
          className="terminal-input"
          placeholder="enter command..."
          aria-label="Terminal command"
          value={value}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const next = value;
            setValue("");
            run(next);
          }}
        />
      </div>
    </div>
  );
}
