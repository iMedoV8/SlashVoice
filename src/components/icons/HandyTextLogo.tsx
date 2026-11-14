// The Slash Voice logo, option B (founder, 2026-11-13; design/stills/01):
// the Slash logo unchanged ("/" in the accent at 800, "Slash" at 700), with
// "Voice" beside it at 400 in the secondary text colour. Set in Onest as live
// text, not drawn. The component keeps its upstream name so imports stay
// untouched and upstream fixes merge cleanly.
// The brand name is not translated, so its parts live outside the JSX.
const SLASH = "/";
const WORD = "Slash";
const SECOND_WORD = "Voice";

const HandyTextLogo = ({
  size = 15,
  className = "",
}: {
  /** Font size in px; every gap scales with it. */
  size?: number;
  className?: string;
}) => (
  <span
    role="img"
    aria-label={`${WORD} ${SECOND_WORD}`}
    dir="ltr"
    className={`inline-flex items-baseline whitespace-nowrap font-ui leading-none select-none ${className}`}
    style={{ fontSize: size, letterSpacing: `${-size * 0.02}px` }}
  >
    <span
      aria-hidden="true"
      className="font-extrabold text-accent"
      style={{ marginInlineEnd: size * 0.07 }}
    >
      {SLASH}
    </span>
    <span aria-hidden="true" className="font-bold text-text">
      {WORD}
    </span>
    <span
      aria-hidden="true"
      className="font-normal text-ink-2"
      style={{ marginInlineStart: size * 0.18 }}
    >
      {SECOND_WORD}
    </span>
  </span>
);

export default HandyTextLogo;
