// Slash Voice placeholder mark. The component keeps its upstream name so
// imports stay untouched and upstream fixes merge cleanly.
const HandyHand = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
  // The sidebar passes a className for its icons; the mark ignores it.
  className?: string;
}) => (
  <svg
    width={width || 126}
    height={height || 135}
    viewBox="0 0 126 135"
    className="fill-text stroke-text"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* The slash */}
    <path
      d="M70 14 L88 14 L50 121 L32 121 Z"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    {/* Two sound waves */}
    <path
      d="M92 50 Q104 67.5 92 85"
      fill="none"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <path
      d="M106 36 Q128 67.5 106 99"
      fill="none"
      strokeWidth="9"
      strokeLinecap="round"
    />
  </svg>
);

export default HandyHand;
