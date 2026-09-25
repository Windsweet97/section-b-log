import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useArgStore } from "@/lib/arg-store";
import { argAudio } from "@/lib/audio";

export const Route = createFileRoute("/kmt")({
  component: KmtPage,
});

const HEX = `0000  49 57 41 44 00 00 00 00  4c 41 49 4e 2e 53 59 53  |IWAD....LAIN.SYS|
0010  54 48 45 52 45 20 49 53  20 4e 4f 20 42 4f 44 59  |THERE IS NO BODY|
0020  53 45 43 54 49 4f 4e 5f  41 2e 4c 4f 47 00 00 00  |SECTION_A.LOG...|
0030  4b 4e 49 47 48 54 53 00  50 4f 4f 4c 00 53 50 52  |KNIGHTS.POOL.SPR|
0040  49 54 45 00 ff ff ff ff  00 0c 1d 00 d2 ff 00 ff  |ITE.............|
0050  43 4c 4f 53 45 20 54 48  45 20 57 4f 52 4c 44 00  |CLOSE THE WORLD.|
0060  4f 50 45 4e 20 54 48 45  20 4e 45 58 54 00 00 00  |OPEN THE NEXT...|
0070  de ad be ef c0 ff ee 00  57 41 44 20 49 53 20 41  |........WAD IS A|
0080  20 4d 41 50 20 4f 46 20  59 4f 55 52 20 53 4b 55  | MAP OF YOUR SKU|
0090  4c 4c 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |LL..............|`;

function KmtPage() {
  const [executed, setExecuted] = useState(false);
  const startGlitch = useArgStore((s) => s.startGlitch);

  return (
    <div className="kmt-page">
      <div className="netscape-window mx-auto">
        <div className="title-bar">
          <span>DEBUG.EXE - [C:\\SUBCONSCIOUS\\KMT.DAT]</span>
          <div className="win-buttons">
            <button
              type="button"
              aria-label="Close"
              onClick={() =>
                startGlitch({
                  message: ">> RETURNING TO SECTION_B...",
                  href: "/B.html?layer=inner",
                })
              }
            >
              X
            </button>
          </div>
        </div>
        <img
          src="/scenes/kmt.jpg"
          alt="Corrupted red dungeon corridor"
          className="kmt-art"
        />
        <div className="web-body" style={{ background: "#000", color: "#33ff33" }}>
          <p className="text-xs text-glitch-red tracking-[0.18em]">
            WARNING: header is not a valid WAD
          </p>
          <pre className="hex-dump mt-3">{HEX}</pre>
          <p className="mt-4 text-xs">
            {`C:\\SUBCONSCIOUS> dir KMT.DAT`}
            <br />
            {"KMT.DAT    1993-12-10    12,447,232 bytes"}
          </p>
          {!executed ? (
            <button
              type="button"
              className="dive-button"
              onClick={() => {
                argAudio.unlock();
                argAudio.scare();
                setExecuted(true);
              }}
            >
              [ EXECUTE ANYWAY ]
            </button>
          ) : (
            <div className="secret-box mt-4">
              {"> EXECUTION HALTED"}
              <br />
              {"> The wad is a map of your skull."}
              <br />
              {"> This is not a game. This is a node."}
              <div className="vn-choices mt-4">
                <button
                  type="button"
                  className="vn-choice"
                  onClick={() =>
                    startGlitch({
                      message: ">> DUMPING INTO SECTION_A...",
                      href: "/section-a",
                      scare: true,
                    })
                  }
                >
                  {"> Follow the map"}
                </button>
                <button
                  type="button"
                  className="vn-choice"
                  onClick={() =>
                    startGlitch({
                      message: ">> RETURNING TO INNER SURFACE...",
                      href: "/B.html?layer=inner",
                    })
                  }
                >
                  {"> Close the file"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
