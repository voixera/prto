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
      <rect x="1" y="1" width="30" height="30" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M8 24V8h7.2c3.4 0 5.6 1.9 5.6 4.7 0 1.8-1 3.2-2.7 4l3.4 7.3h-3.3l-3-6.6H11V24H8Zm3-9.3h3.8c1.6 0 2.6-.8 2.6-2.1S16.4 10.5 14.8 10.5H11V14.7Z" fill="currentColor" />
    </svg>
  );
}
