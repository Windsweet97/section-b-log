import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { argAudio } from "@/lib/audio";

export type Layer = "surface" | "inner";

export type GlitchJob = {
  message: string;
  href?: string;
  scare?: boolean;
  thenLayer?: Layer;
};

type Secrets = {
  packet: boolean;
  lain: boolean;
  knights: boolean;
};

type ArgState = {
  entered: boolean;
  layer: Layer;
  innerUnlocked: boolean;
  muted: boolean;
  visitorClicks: number;
  secrets: Secrets;
  glitch: GlitchJob | null;
  enter: () => void;
  setLayer: (layer: Layer) => void;
  unlockInner: () => void;
  setMuted: (muted: boolean) => void;
  bumpVisitor: () => number;
  markSecret: (key: keyof Secrets) => void;
  startGlitch: (job: GlitchJob) => void;
  clearGlitch: () => void;
};

export const useArgStore = create<ArgState>()(
  persist(
    (set, get) => ({
      entered: false,
      layer: "surface",
      innerUnlocked: false,
      muted: false,
      visitorClicks: 0,
      secrets: { packet: false, lain: false, knights: false },
      glitch: null,
      enter: () => {
        argAudio.unlock();
        set({ entered: true });
      },
      setLayer: (layer) => set({ layer }),
      unlockInner: () => set({ innerUnlocked: true, layer: "inner" }),
      setMuted: (muted) => {
        argAudio.setMuted(muted);
        set({ muted });
      },
      bumpVisitor: () => {
        const next = get().visitorClicks + 1;
        const unlock = next >= 7;
        set({
          visitorClicks: next,
          innerUnlocked: unlock ? true : get().innerUnlocked,
        });
        return next;
      },
      markSecret: (key) =>
        set((s) => ({ secrets: { ...s.secrets, [key]: true } })),
      startGlitch: (job) => {
        argAudio.unlock();
        if (job.scare) argAudio.scare();
        else argAudio.glitch();
        set({ glitch: job });
      },
      clearGlitch: () => set({ glitch: null }),
    }),
    {
      name: "section-b-arg-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        layer: s.layer,
        innerUnlocked: s.innerUnlocked,
        muted: s.muted,
        visitorClicks: s.visitorClicks,
        secrets: s.secrets,
      }),
    },
  ),
);
