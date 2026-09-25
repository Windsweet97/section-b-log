type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

function AudioContextCtor(): typeof AudioContext | undefined {
  if (typeof window === "undefined") return undefined;
  return window.AudioContext || (window as WebkitWindow).webkitAudioContext;
}

class ArgAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private osc: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private muted = false;
  ambientOn = false;

  unlock() {
    const Ctor = AudioContextCtor();
    if (!Ctor) return;
    if (!this.ctx) {
      this.ctx = new Ctor({ latencyHint: "interactive" });
      this.master = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.7;
      this.music.gain.value = 0.85;
      this.sfx.gain.value = 0.9;
      this.music.connect(this.master);
      this.sfx.connect(this.master);
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(
        muted ? 0 : 0.7,
        this.ctx.currentTime,
        0.03,
      );
    }
  }

  startAmbient() {
    this.unlock();
    if (!this.ctx || !this.music || this.ambientOn) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 110;
    gain.gain.value = 0.055;

    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.3;
    lfoGain.gain.value = 3.5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(gain);
    gain.connect(this.music);
    lfo.start();
    osc.start();

    this.osc = osc;
    this.lfo = lfo;
    this.ambientGain = gain;
    this.ambientOn = true;
  }

  stopAmbient() {
    if (this.osc) {
      try {
        this.osc.stop();
      } catch {
        /* already stopped */
      }
      this.osc.disconnect();
      this.osc = null;
    }
    if (this.lfo) {
      try {
        this.lfo.stop();
      } catch {
        /* already stopped */
      }
      this.lfo.disconnect();
      this.lfo = null;
    }
    this.ambientGain?.disconnect();
    this.ambientGain = null;
    this.ambientOn = false;
  }

  glitch() {
    this.unlock();
    if (!this.osc || !this.ctx) return;
    const t = this.ctx.currentTime;
    this.osc.frequency.cancelScheduledValues(t);
    this.osc.frequency.setValueAtTime(432, t);
    this.osc.frequency.exponentialRampToValueAtTime(60, t + 1.2);
  }

  scare() {
    this.unlock();
    if (!this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(80, t);
    osc1.frequency.exponentialRampToValueAtTime(12, t + 0.42);

    osc2.type = "square";
    osc2.frequency.setValueAtTime(1800, t);
    osc2.frequency.exponentialRampToValueAtTime(180, t + 0.42);

    gain.gain.setValueAtTime(0.38, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfx);
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.55);
    osc2.stop(t + 0.55);
    osc1.onended = () => {
      osc1.disconnect();
      osc2.disconnect();
      gain.disconnect();
    };
  }

  modemBlip() {
    this.unlock();
    if (!this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.1);
    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain);
    gain.connect(this.sfx);
    osc.start(t);
    osc.stop(t + 0.13);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
}

export const argAudio = new ArgAudio();
