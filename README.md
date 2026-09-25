# SECTION_B.LOG

**by [Windsweet97](https://github.com/Windsweet97)**

Present day. Present time. Close the world, open the next.

This is a conceptual project mainly made of a few websites. It has several branches that together form a worldview and explore the internet, alienation in modern society, and the themes of postmodernism and contemporary loneliness.

You do not play one page. You move between surfaces that pretend to be separate — a Geocities homepage, a late-night visual novel, a corrupted WAD dump, a teletype that bleeds. Each branch is a different protocol for the same question: if you are reading this through a browser, whose eyes are you using?

<p align="center">
  <img src="screenshots/boot.png" alt="Boot screen — SECTION_B.LOG modem dial-in" width="900" />
</p>

## Worldview

SECTION_B looks like a backup. A 1994 Netscape shell. Pool water, Sprite, midi, a visitor counter frozen on 0041994. It is not a backup. It is the bottom of a mind that built a familiar interface so the rest of it could keep working.

The sites are not levels. They are the same loop seen from different depths:

- **The surface** is social and aesthetic — the face you show a network so you can stay online.
- **The Wired** is memory and weather — classroom, rooftop, bedroom, a node with no coordinates.
- **KMT.DAT** is the body as archive — a map of a skull mistaken for a game file.
- **SECTION_A** is ego and noise — the processing layer B was built to contain.

Alienation here is not “nobody talks to you.” It is being fully connected and still unlocated. Postmodern loneliness is the guestbook that answers, the Knights who are watching, the girl in the node who already knows you clicked.

## The story

3:04 AM. Lights off. A 56k carrier locks without lifting the physical line. A zero-byte file named like a person sits in the server root and refuses to be deleted. A packet says physical bodies are obsolete and asks if you have checked the rooftop.

You stay after hours in a classroom whose fluorescents never fully die. You find a Geocities page that should not exist on the school LAN. You follow it to rain on chain-link, to a Sprite can with no footprints, to a girl with an asymmetric hair clip standing in a node.

Everyone thinks SECTION_B is the shallow layer. Peel it and the architecture wraps around itself: the surface is the deepest room. SECTION_A is where the real processing happens. Crossing over is optional. Disconnecting is not the same as leaving.

## How to play

This is an ARG / visual novel. There is no score. You wander, you leak, you click until a layer admits you.

1. **Dial in.** Open the boot screen and press `[ DIAL IN ]`. That is SECTION_B, the Netscape homepage.
2. **Read the surface.** Scroll the logs. Click **[CLICK TO INSPECT PACKET TRACE]**. Decode the Base64. The visitor counter is not only a counter — click it until it overflows (seven times).
3. **Talk to the machine.** The sidebar terminal accepts commands. Start with `HELP`. Try `LAIN`, `KNIGHTS`, `CONNECT`, `SPRITE`, `WHO`, `DIVE`.
4. **Enter the Wired.** Use **Go** in the menu, the nav protocols, or `CONNECT`. Tap the scene to advance dialogue, then pick a branch:
   - LAYER 00 classroom
   - LAYER 01 rooftop
   - LAYER 02 bedroom terminal
   - LAYER 03 Deep Wired
   - God of the Wired / SECTION_A / KMT.DAT
5. **Dump KMT.DAT** when the inner surface lets you. Execute the header. It is not a valid WAD.
6. **Cross into SECTION_A** if the girl lets you. Let the teletype finish. You can walk back.

Secrets (packet / the girl / the Knights) are marked when you actually find them, not when you skip. File → *Open true inner surface* is a shortcut after the counter or `DIVE`. Mute lives under **Options**.

There is no correct ending. Closing the world and opening the next is a command, not a reward.

## Layers

| Layer | What it is |
| --- | --- |
| **SECTION_B** | Retro homepage: guestbook, packet dump, terminal, hidden links |
| **THE WIRED** | Branching visual novel — classroom → rooftop → the node |
| **KMT.DAT** | Hex dump of a WAD that is a map of your skull |
| **SECTION_A** | Consciousness bleed, 70ms teletype |

## Screenshots

<p align="center">
  <img src="screenshots/section-b-surface.png" alt="SECTION_B surface — Netscape homepage" width="900" />
</p>

<p align="center">
  <img src="screenshots/wired-classroom.png" alt="THE WIRED — LAYER 00 classroom after hours" width="900" />
  <img src="screenshots/wired-rooftop.png" alt="THE WIRED — LAYER 01 rooftop rain holdover" width="900" />
</p>

<p align="center">
  <img src="screenshots/kmt.png" alt="KMT.DAT — DEBUG.EXE hex dump" width="900" />
  <img src="screenshots/section-a.png" alt="SECTION_A.LOG teletype" width="900" />
</p>

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

```bash
npm run build      # production build
npm run typecheck
npm run test
```

Stack: TanStack Start, React 19, Vite, Zustand, Tailwind.

## Routes

| Path | What it is |
| --- | --- |
| `/` or `/B.html` | Boot modem → SECTION_B surface / inner |
| `/wired?node=start` | Visual novel |
| `/kmt` | DEBUG.EXE hex dump |
| `/section-a` | Teletype dump |
