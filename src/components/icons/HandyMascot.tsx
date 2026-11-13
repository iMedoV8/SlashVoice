/**
 * Slash Voice placeholder mascot: the slash mark on a rounded tile. The line
 * colour follows the theme (`mascot-line`). The component keeps its upstream
 * name so imports stay untouched.
 */
const HandyMascot = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 151 165"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="15"
        width="135"
        height="135"
        rx="34"
        fill="#fff"
        className="stroke-mascot-line"
        strokeWidth="7"
      />
      <path d="M79 42 L97 42 L66 123 L48 123 Z" className="fill-mascot-line" />
      <path
        d="M103 66 Q113 82.5 103 99"
        className="stroke-mascot-line"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HandyMascot;
