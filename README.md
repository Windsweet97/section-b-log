# SECTION_B.LOG

Present day. Present time. Close the world, open the next.

A Serial Experiments Lain–inspired visual novel / ARG in a 1994 Netscape shell. Dial in, wander Nirvana Pool, leak into the Wired, and keep clicking until the inner layer opens.

## Layers

- **SECTION_B** — retro homepage: guest book, packet dump, hidden links
- **THE WIRED** — branching visual novel (classroom → rooftop → LAIN.SYS)
- **KMT.DAT** — hex dump of a WAD that is a map of your skull
- **SECTION_A** — consciousness bleed, 70ms teletype

Secrets unlock when you read the packet, find the girl, and visit the Knights.

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
| `/` | Boot modem → SECTION_B surface / inner |
| `/wired?node=start` | Visual novel |
| `/kmt` | DEBUG.EXE hex dump |
| `/section-a` | Teletype dump |

## License

Fan work. Serial Experiments Lain belongs to its original creators.
