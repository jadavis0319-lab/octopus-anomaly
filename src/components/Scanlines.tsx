// Static overlay components — no client-side JS needed.
// The scanline sweep uses a CSS animation defined in globals.css.

export default function Scanlines() {
  return (
    <>
      {/* Static CRT scanlines texture */}
      <div className="scanlines" aria-hidden="true" />
      {/* Slow vertical sweep for ambiance */}
      <div className="scanline-sweep" aria-hidden="true" />
    </>
  );
}
