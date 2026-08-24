export default function BrandMark({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="brand-mark"
    >
      {/* Minimal geometric mark — abstract "P" / "48" reference */}
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M9 24V8h6.5c3.1 0 5.2 1.7 5.2 4.4 0 1.7-0.9 3-2.4 3.8L20 24h-3.4l-2.8-6H12v6H9Zm3-8.8h3.3c1.5 0 2.4-0.75 2.4-1.95S16.8 11.3 15.3 11.3H12V15.2Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
