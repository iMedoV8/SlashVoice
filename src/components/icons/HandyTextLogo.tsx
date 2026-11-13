// Slash Voice placeholder wordmark. The component keeps its upstream name so
// imports stay untouched and upstream fixes merge cleanly.
// The brand name is not translated, so it lives outside the JSX.
const BRAND_NAME = "Slash Voice";

const HandyTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 930 328"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Slash Voice"
    >
      <path d="M118 40 L172 40 L96 288 L42 288 Z" className="logo-primary" />
      <text
        x="212"
        y="218"
        className="logo-stroke"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="148"
        fontWeight="700"
        textLength="690"
        lengthAdjust="spacingAndGlyphs"
      >
        {BRAND_NAME}
      </text>
    </svg>
  );
};

export default HandyTextLogo;
