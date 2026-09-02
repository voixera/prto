/**
 * GrainOverlay — Film grain texture via animated SVG filter
 * Fixed, pointer-events-none, covers entire viewport.
 * Uses feColorMatrix+feTurbulence for animated organic noise.
 */
export default function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              dur="8s"
              values="0.65;0.75;0.65"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="0.055" />
      </svg>
    </div>
  );
}
