import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { argAudio } from "@/lib/audio";
import { useArgStore } from "@/lib/arg-store";
import { GlitchOverlay } from "@/components/glitch-overlay";

export function ArgShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const glitch = useArgStore((s) => s.glitch);
  const clearGlitch = useArgStore((s) => s.clearGlitch);
  const setLayer = useArgStore((s) => s.setLayer);
  const unlockInner = useArgStore((s) => s.unlockInner);

  useEffect(() => {
    const unsub = useArgStore.subscribe((s) => {
      argAudio.setMuted(s.muted);
    });
    void Promise.resolve(useArgStore.persist.rehydrate()).then(() => {
      argAudio.setMuted(useArgStore.getState().muted);
    });

    const onVis = () => {
      if (document.visibilityState === "visible") argAudio.unlock();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      unsub();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (!glitch) return;
    const delay = glitch.scare ? 800 : 1200;
    const timer = window.setTimeout(() => {
      const job = useArgStore.getState().glitch;
      clearGlitch();
      if (!job) return;
      if (job.thenLayer === "inner") unlockInner();
      else if (job.thenLayer === "surface") setLayer("surface");
      if (job.href) router.history.push(job.href);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [glitch, clearGlitch, router, setLayer, unlockInner]);

  return (
    <div className={glitch?.scare ? "arg-root jumpscare-active" : "arg-root"}>
      <div className="scanlines" aria-hidden="true" />
      {glitch ? (
        <GlitchOverlay message={glitch.message} scare={Boolean(glitch.scare)} />
      ) : null}
      {children}
    </div>
  );
}
