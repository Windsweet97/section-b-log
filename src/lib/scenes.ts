export type NodeId =
  | "start"
  | "rooftop"
  | "boot_pc"
  | "deep_wired_entry"
  | "god_of_wired"
  | "system_crash";

export type SceneChoice =
  | { label: string; node: NodeId }
  | { label: string; href: string };

export type Scene = {
  id: NodeId;
  title: string;
  location: string;
  bg: string;
  lines: { speaker?: string; text: string }[];
  choices: SceneChoice[];
};

export const NODE_IDS: NodeId[] = [
  "start",
  "rooftop",
  "boot_pc",
  "deep_wired_entry",
  "god_of_wired",
  "system_crash",
];

export function isNodeId(value: string): value is NodeId {
  return (NODE_IDS as string[]).includes(value);
}

export const SCENES: Record<NodeId, Scene> = {
  start: {
    id: "start",
    title: "LAYER 00",
    location: "Classroom — after hours",
    bg: "/scenes/classroom.jpg",
    lines: [
      {
        text: "The fluorescents never fully die. They just hum, a 60Hz prayer over empty desks.",
      },
      {
        text: "You stayed. Not for club. Not for anyone. The CRT at the back of the room is already on.",
      },
      {
        text: "On the screen: a Geocities page that shouldn't exist on the school LAN. SECTION_B.LOG. Cyan water. A visitor counter stuck on 0041994.",
      },
      {
        speaker: "???",
        text: "Present day. Present time. If you can read this, you are not outside.",
      },
    ],
    choices: [
      { label: "Go to the rooftop", node: "rooftop" },
      { label: "Sit at the terminal", node: "boot_pc" },
      { label: "Open SECTION_B.LOG", href: "/B.html" },
    ],
  },
  rooftop: {
    id: "rooftop",
    title: "LAYER 01",
    location: "Rooftop — rain holdover",
    bg: "/scenes/rooftop.jpg",
    lines: [
      {
        text: "Wind comes over the chain-link like a modem handshake. Puddles hold the city upside down.",
      },
      {
        text: "Someone left an ice-cold Sprite can by the fence. Condensation. No footprints.",
      },
      {
        speaker: "packet",
        text: "TRACE: 127.0.0.1 -> WIRED_GATEWAY. MSG: Physical bodies are obsolete. Have you checked the rooftop?",
      },
      {
        text: "You are on the rooftop. The message is still arriving.",
      },
    ],
    choices: [
      { label: "Return to the classroom", node: "start" },
      { label: "Dial the bedroom terminal", node: "boot_pc" },
      { label: "Follow the gateway", node: "deep_wired_entry" },
    ],
  },
  boot_pc: {
    id: "boot_pc",
    title: "LAYER 02",
    location: "Bedroom — 3:04 AM",
    bg: "/scenes/bedroom.jpg",
    lines: [
      {
        text: "Lights off. The only illumination is the deep cyan glare of the CRT. A Sprite can crackles on the desk.",
      },
      {
        text: "Through the headphones, a watery chorus pedal loops — like sinking into an abandoned pool. The hum behind the bassline is not coming from the tape.",
      },
      {
        text: "A zero-byte file sits in the server root: LAIN.SYS. Every time you try to delete it, the 56k dials out without lifting the physical line.",
      },
      {
        speaker: "guestbook",
        text: "The Knights are watching the nodes.",
      },
    ],
    choices: [
      { label: "Open SECTION_B.LOG", href: "/B.html" },
      { label: "Enter the Deep Wired", node: "deep_wired_entry" },
      { label: "Do not delete LAIN.SYS", node: "god_of_wired" },
    ],
  },
  deep_wired_entry: {
    id: "deep_wired_entry",
    title: "LAYER 03",
    location: "Deep Wired — no floor",
    bg: "/scenes/wired.jpg",
    lines: [
      {
        text: "You are not using a browser. The browser is using you. Cables run under black water like a nervous system that learned how to pray.",
      },
      {
        text: "Everyone thinks SECTION_B is a backup. A superficial blog of pool water and midi tracks. They are wrong. The architecture wraps around itself.",
      },
      {
        speaker: "KNIGHTS",
        text: "We are everywhere in the sub-layer. The surface is the bottom.",
      },
      {
        text: "A girl with an asymmetric hair clip is standing in a node that has no coordinates. Do not disconnect the power supply.",
      },
    ],
    choices: [
      { label: "Approach the girl", node: "god_of_wired" },
      { label: "Peel SECTION_B to the inner surface", href: "/B.html?layer=inner" },
      { label: "Disconnect anyway", node: "system_crash" },
    ],
  },
  god_of_wired: {
    id: "god_of_wired",
    title: "GOD OF THE WIRED",
    location: "Node — unlisted",
    bg: "/scenes/wired.jpg",
    lines: [
      {
        speaker: "the girl",
        text: "If this is my deepest layer, and you are reading it… then whose eyes are you using right now?",
      },
      {
        text: "She does not blink. The hair clip catches a light that is not in the room. Behind her, SECTION_A waits like an open vein.",
      },
      {
        speaker: "the girl",
        text: "SECTION_A is where the real processing happens. The ego. The noise. I can't protect you once you cross over.",
      },
      {
        speaker: "the girl",
        text: "Close the world. Open the next.",
      },
    ],
    choices: [
      { label: "Cross into SECTION_A", href: "/section-a" },
      { label: "Return to the inner surface", href: "/B.html?layer=inner" },
      { label: "Stay in the classroom loop", node: "start" },
    ],
  },
  system_crash: {
    id: "system_crash",
    title: "FATAL EXCEPTION",
    location: "0x00000000",
    bg: "/scenes/kmt.jpg",
    lines: [
      {
        text: "A fatal exception 0E has occurred at 0028:C0005A4D in VXD WIRED(01) + 00005A4D.",
      },
      {
        text: "The current application will be terminated. Your body is still in the chair. That is not the same as being here.",
      },
      {
        speaker: "PROTOCOL",
        text: "CLOSE THE WORLD, OPEN THE NEXT.",
      },
    ],
    choices: [
      { label: "Reboot to SECTION_B", href: "/B.html" },
      { label: "Dump KMT.DAT", href: "/kmt" },
      { label: "Force connect anyway", node: "deep_wired_entry" },
    ],
  },
};
