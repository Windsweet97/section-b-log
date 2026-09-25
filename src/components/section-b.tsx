import { useState } from "react";
import { argAudio } from "@/lib/audio";
import { useArgStore } from "@/lib/arg-store";
import { NetscapeWindow } from "@/components/netscape-window";
import { TerminalShell } from "@/components/terminal-shell";

const ASCII = `  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
   _.~"~._.~"~._  NIRVANA_POOL_SYS  _.~"~._.~"~._
  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
        ┌──────────────┐      [ SPRITE_FIZZ.EXE ]
        │  [ 90s_WEB ] │     .-------------------.
        │  ( - _ - )   │    ( REFRESH YOUR MIND  )
        │   <|   |>    │     '-------------------'
        └──────┬───────┘
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;

function Bubbles() {
  return (
    <>
      <div className="bubble" style={{ left: "8%", width: 12, height: 12, animationDelay: "0s" }} />
      <div className="bubble" style={{ left: "32%", width: 8, height: 8, animationDelay: "2s" }} />
      <div className="bubble" style={{ left: "65%", width: 14, height: 14, animationDelay: "4.5s" }} />
      <div className="bubble" style={{ left: "88%", width: 10, height: 10, animationDelay: "1.2s" }} />
    </>
  );
}

export function SectionB() {
  const layer = useArgStore((s) => s.layer);
  const innerUnlocked = useArgStore((s) => s.innerUnlocked);
  const visitorClicks = useArgStore((s) => s.visitorClicks);
  const bumpVisitor = useArgStore((s) => s.bumpVisitor);
  const startGlitch = useArgStore((s) => s.startGlitch);
  const markSecret = useArgStore((s) => s.markSecret);
  const [packetOpen, setPacketOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [decoded, setDecoded] = useState(false);

  const jump = (node: string) => {
    startGlitch({
      message: `>> CONNECTING TO LAYER_NODE: [${node.toUpperCase()}]...`,
      href: `/wired?node=${encodeURIComponent(node)}`,
    });
  };

  const togglePlay = () => {
    argAudio.unlock();
    if (!playing) {
      argAudio.startAmbient();
      setPlaying(true);
    } else {
      argAudio.stopAmbient();
      setPlaying(false);
    }
  };

  const count = String(41994 + visitorClicks).padStart(7, "0");
  const isInner = layer === "inner";

  return (
    <div className="page-wrap">
      <NetscapeWindow
        title={
          isInner
            ? "Netscape - [SECTION_B.LOG // THE_SURFACE_IS_THE_BOTTOM]"
            : "Netscape Navigator - [SECTION_B.LOG // SUBCONSCIOUS_BUFFER]"
        }
        url={
          isInner
            ? "file:///C:/SUBCONSCIOUS/SECTION_B.LOG"
            : "http://www.geocities.com/underwater_1994/B.html?layer=02"
        }
        onJump={jump}
        onClose={() => jump("system_crash")}
      >
        <Bubbles />

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {isInner
              ? "*** THIS IS THE SURFACE *** BUT ALSO THE DEEPEST LAYER *** NO ONE ELSE IS HERE *** DO NOT EXECUTE KMT.DAT *** YOU ARE ALREADY INSIDE *** *** THIS IS THE SURFACE *** BUT ALSO THE DEEPEST LAYER *** NO ONE ELSE IS HERE *** DO NOT EXECUTE KMT.DAT *** YOU ARE ALREADY INSIDE *** "
              : "*** WELCOME TO SECTION_B *** REFRESH YOUR MIND WITH ICE-COLD SPRITE *** DIAL-IN NOISE DETECTED FROM IP: [KNIGHTS_UNKNOWN] *** CLOSE THE WORLD, OPEN THE NEXT *** *** WELCOME TO SECTION_B *** REFRESH YOUR MIND WITH ICE-COLD SPRITE *** DIAL-IN NOISE DETECTED FROM IP: [KNIGHTS_UNKNOWN] *** CLOSE THE WORLD, OPEN THE NEXT *** "}
          </div>
        </div>

        <header className="blog-header">
          <h1 className="site-title">
            {isInner ? "SECTION_B.LOG" : "SECTION_B.LOG // 1994"}
          </h1>
          <div className="subtitle">
            {isInner
              ? "~ Paradoxical Buffer / True Monologue ~"
              : "~ Underwater Liquid Matrix, Echoes & Sub-Conscious Buffers ~"}
          </div>
        </header>

        <div className="main-grid">
          <aside className="sidebar">
            <div className="widget-box">
              <div className="widget-title">SYSTEM_STATUS</div>
              {isInner ? (
                <>
                  <p>
                    Status: <span className="text-glitch-red">BLEEDING</span>
                  </p>
                  <p>Depth: Layer_00 (Surface)</p>
                  <p>Reality: 404 Not Found</p>
                </>
              ) : (
                <>
                  <p>
                    Status: <span className="text-sprite-green">SUSPENDED</span>
                  </p>
                  <p>Sub-Ether Temp: 18°C</p>
                  <p>Beverage: Sprite (330ml)</p>
                  <p>Modem: 56k Carrier Locked</p>
                </>
              )}
            </div>

            {!isInner ? (
              <>
                <div className="widget-box">
                  <div className="widget-title">VISITOR_COUNTER</div>
                  <button
                    type="button"
                    className="counter"
                    onClick={() => {
                      argAudio.modemBlip();
                      const n = bumpVisitor();
                      if (n === 7) {
                        startGlitch({
                          message: ">> COUNTER OVERFLOW — INNER SURFACE EXPOSED",
                          thenLayer: "inner",
                        });
                      }
                    }}
                  >
                    {count}
                  </button>
                </div>

                <div className="widget-box">
                  <div className="widget-title">AUDIO_BUFFER</div>
                  <div className="player-box">
                    <div className="player-display" data-playing={playing}>
                      {playing
                        ? "01. Nirvana - Lounge Act.mid [ECHO_ACTIVE]"
                        : "01. Nirvana - Lounge Act.mid"}
                    </div>
                    <button type="button" className="win-btn" onClick={togglePlay}>
                      [ PLAY / PAUSE BGM ]
                    </button>
                  </div>
                </div>
              </>
            ) : null}

            <div className="widget-box">
              <div className="widget-title">TERMINAL_SHELL</div>
              <TerminalShell onJump={jump} />
            </div>

            <div className="widget-box">
              <div className="widget-title">
                {isInner ? "DIRECTORY_TREE" : "NAV_PROTOCOLS"}
              </div>
              <ul className="nav-links">
                {isInner ? (
                  <>
                    <li>
                      <button type="button" className="nav-link" onClick={() => jump("start")}>
                        {"> RETURN_TO_GALGAME"}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="nav-link"
                        onClick={() =>
                          startGlitch({
                            message: ">> CONNECTING TO SECTION_A...",
                            href: "/section-a",
                          })
                        }
                      >
                        {"> SECTION_A (The Wired)"}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="nav-link nav-link-doom"
                        onClick={() =>
                          startGlitch({
                            message: ">> OPENING KMT.DAT...",
                            href: "/kmt",
                          })
                        }
                      >
                        {"> KMT.DAT [CORRUPTED]"}
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button type="button" className="nav-link" onClick={() => jump("start")}>
                        {"> Layer 00: Classroom"}
                      </button>
                    </li>
                    <li>
                      <button type="button" className="nav-link" onClick={() => jump("rooftop")}>
                        {"> Layer 01: Rooftop"}
                      </button>
                    </li>
                    <li>
                      <button type="button" className="nav-link" onClick={() => jump("boot_pc")}>
                        {"> Layer 02: Terminal"}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="nav-link"
                        onClick={() => jump("deep_wired_entry")}
                      >
                        {"> Layer 03: Deep Wired"}
                      </button>
                    </li>
                    {innerUnlocked ? (
                      <li>
                        <button
                          type="button"
                          className="nav-link nav-link-doom"
                          onClick={() =>
                            startGlitch({
                              message: ">> PEELING SURFACE BUFFER...",
                              thenLayer: "inner",
                            })
                          }
                        >
                          {"> TRUE_INNER_SURFACE"}
                        </button>
                      </li>
                    ) : null}
                  </>
                )}
              </ul>
            </div>
          </aside>

          <main>
            {isInner ? <InnerLogs onJump={jump} /> : (
              <SurfaceLogs
                packetOpen={packetOpen}
                decoded={decoded}
                onTogglePacket={() => {
                  setPacketOpen((v) => !v);
                  argAudio.glitch();
                  markSecret("packet");
                }}
                onDecode={() => setDecoded(true)}
                onJump={jump}
              />
            )}
          </main>
        </div>

        <footer className="site-footer">
          <div style={{ marginBottom: 8 }}>
            <span className="badge">{isInner ? "ARG_LAYER: 00/MAX" : "ARG_LAYER: 02"}</span>
            <span className="badge">NETSCAPE 3.0 READY</span>
            <span className="badge">KNIGHTS_APPROVED</span>
          </div>
          <p>
            {isInner
              ? "© 1994 SECTION_B // THE MIND IS A MOBIUS STRIP"
              : "© 1994 SECTION_B.LOG // ALL RIGHTS RESERVED IN THE WIRED"}
          </p>
        </footer>
      </NetscapeWindow>
    </div>
  );
}

function SurfaceLogs({
  packetOpen,
  decoded,
  onTogglePacket,
  onDecode,
  onJump,
}: {
  packetOpen: boolean;
  decoded: boolean;
  onTogglePacket: () => void;
  onDecode: () => void;
  onJump: (node: string) => void;
}) {
  const startGlitch = useArgStore((s) => s.startGlitch);

  return (
    <>
      <article className="log-post">
        <div className="post-header">
          <span>LOG #094 // LIQUID_SIGNAL_BLEED</span>
          <span>DATE: 1994-09-08</span>
        </div>
        <div className="post-body">
          <p>
            3:04 AM. Lights turned off. The only illumination in my room is the deep
            cyan glare of the CRT monitor.
          </p>
          <p>
            An ice-cold can of Sprite crackles on my desk as tiny carbonation bubbles
            float up the glass. Through my headphones, Kurt’s chorus pedal loops
            endlessly—that watery, pitch-bent tone feels like sinking into the bottom
            of an abandoned swimming pool.
          </p>
          <div className="ascii-box">{ASCII}</div>
          <p>
            Except tonight, the hum behind the bassline isn't coming from the tape.
            It's a binary carrier tone. When I stare into the swimming pool backdrop
            on my screen, it doesn't stop at the bezel. I swear I can hear real water
            dripping somewhere behind my sound card.
          </p>
          <p style={{ marginTop: 8 }}>
            <button type="button" className="hidden-trigger" onClick={onTogglePacket}>
              [CLICK TO INSPECT PACKET TRACE]
            </button>
          </p>
          {packetOpen ? (
            <div className="secret-box">
              {"> TRACE: 127.0.0.1 -> WIRED_GATEWAY"}
              <br />
              {'> MSG: "Physical bodies are obsolete. Have you checked the rooftop?"'}
              <br />
              {"> LINK: "}
              <button
                type="button"
                className="hidden-trigger"
                onClick={() => onJump("rooftop")}
              >
                [EXECUTE_ROOFTOP_PROTOCOL]
              </button>
            </div>
          ) : null}
        </div>
      </article>

      <article className="log-post">
        <div className="post-header">
          <span>LOG #095 // THE_GIRL_IN_THE_BUFFER</span>
          <span>DATE: 1994-08-24</span>
        </div>
        <div className="post-body">
          <p>
            Saw an unlisted IP scraping my Geocities directory at 4:12 AM. Trace route
            leads nowhere. It left a single zero-byte file in my server root:{" "}
            <span className="corrupted-text">LAIN.SYS</span>.
          </p>
          <p>
            Every time I attempt to delete it, my 56k modem dials out automatically
            without picking up the physical phone line. Someone left a message in my
            guestbook saying: <i>"The Knights are watching the nodes."</i>
          </p>
          <p style={{ marginTop: 10 }}>
            Base64 Cipher found in header:{" "}
            <button
              type="button"
              className="corrupted-text"
              onClick={onDecode}
            >
              U0VHVkYgRVIgTk8gQk9EWS4=
            </button>
            {decoded ? (
              <span className="secret-box" style={{ display: "block", marginTop: 8 }}>
                Decoded: "Here has no body."
              </span>
            ) : null}
          </p>
        </div>
      </article>

      <article className="log-post log-post-restricted">
        <div className="post-header">
          <span>LOG #096 // [RESTRICTED_PROTOCOL]</span>
          <span>DATE: UNKNOWN</span>
        </div>
        <div className="post-body">
          <p>
            If you are reading this from a browser, you are not outside. You are
            already inside the network loop.
          </p>
          <p>
            The girl with the asymmetric hair clip is standing in the deep wired node.
            Do not disconnect the power supply.
          </p>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              type="button"
              className="connect-btn"
              onClick={() => onJump("god_of_wired")}
            >
              {">> CONNECT TO GOD OF THE WIRED"}
            </button>
            <button
              type="button"
              className="connect-btn"
              onClick={() =>
                startGlitch({
                  message: ">> PEELING SURFACE BUFFER...",
                  thenLayer: "inner",
                })
              }
            >
              {">> PEEL THE SURFACE"}
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

function InnerLogs({ onJump }: { onJump: (node: string) => void }) {
  const startGlitch = useArgStore((s) => s.startGlitch);

  return (
    <>
      <article className="log-post">
        <div className="post-header">
          <span>LOG #001 // THE_PARADOX</span>
          <span>DATE: PRESENT DAY</span>
        </div>
        <div className="post-body">
          <p>
            Everyone thinks SECTION_B is just a secondary archive. A backup. A
            superficial aesthetic blog filled with pool water, Sprite cans, and 90s
            alt-rock midi tracks.
          </p>
          <br />
          <p>They are wrong.</p>
          <br />
          <p>
            The deeper you dig into a system, the more the architecture wraps around
            itself. This isn't the surface. This is the absolute bottom of my mind. A
            containment zone. I built this retro interface so I could look at
            something familiar while the rest of my consciousness unravels.
          </p>
        </div>
      </article>

      <article className="log-post">
        <div className="post-header">
          <span>LOG #000 // INVITATION</span>
          <span>DATE: NULL</span>
        </div>
        <div className="post-body">
          <p>
            You’ve been clicking around. You found the DOOM archive (KMT.DAT). You've
            played the visual novel. You think you are the player observing the
            protagonist.
          </p>
          <br />
          <p>
            But if this is my deepest layer, and you are reading it... then whose eyes
            are you using right now?
          </p>
          <br />
          <p>
            SECTION_A is where the real processing happens. It is the raw Wired. The
            ego. The noise. I can't protect you once you cross over.
          </p>
          <button
            type="button"
            className="dive-button"
            onClick={() =>
              startGlitch({
                message: ">> INITIALIZING PROTOCOL_LAIN...",
                href: "/section-a",
                scare: true,
              })
            }
          >
            [ PUSH ME INTO THE WIRED ]
          </button>
          <p style={{ marginTop: 14 }}>
            <button type="button" className="hidden-trigger" onClick={() => onJump("start")}>
              [ or walk back through the classroom ]
            </button>
          </p>
        </div>
      </article>
    </>
  );
}
