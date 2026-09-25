export function GlitchOverlay({
  message,
  scare,
}: {
  message: string;
  scare: boolean;
}) {
  return (
    <div className="glitch-overlay" role="alert">
      <div>{message}</div>
      <div className="glitch-sub">
        {scare ? "[ RE-ROUTING TO THE WIRED ]" : "[ PROTOCOL HANDSHAKE ]"}
      </div>
    </div>
  );
}
