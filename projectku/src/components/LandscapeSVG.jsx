/**
 * LandscapeSVG — Cinematic atmospheric SVG landscape compositions
 * Each scene is a distinct visual environment used across sections.
 * Replace with real AI-generated images by wrapping in <img> or background-image.
 */

/** Scene 01 — HERO: Vast mountain range at dusk, atmospheric depth layers */
export function HeroLandscape({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hl-sky" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#1a1410" />
          <stop offset="40%" stopColor="#0e0c0a" />
          <stop offset="100%" stopColor="#060504" />
        </radialGradient>
        <radialGradient id="hl-glow1" cx="30%" cy="45%" r="35%">
          <stop offset="0%" stopColor="#c8824a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c8824a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hl-glow2" cx="72%" cy="38%" r="25%">
          <stop offset="0%" stopColor="#8b6a9e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#8b6a9e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hl-horizon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8824a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c8824a" stopOpacity="0" />
        </linearGradient>
        <filter id="hl-blur-far">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="hl-blur-mid">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="hl-blur-near">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill="url(#hl-sky)" />

      {/* Atmospheric glows */}
      <ellipse cx="432" cy="405" rx="500" ry="300" fill="url(#hl-glow1)" />
      <ellipse cx="1037" cy="342" rx="360" ry="220" fill="url(#hl-glow2)" />

      {/* Horizon light band */}
      <rect x="0" y="380" width="1440" height="120" fill="url(#hl-horizon)" />

      {/* Stars — distant layer */}
      {[
        [120,60],[280,40],[450,90],[600,30],[720,70],[900,45],[1050,80],[1200,55],[1350,35],
        [180,120],[350,100],[520,140],[700,110],[860,130],[1020,95],[1180,120],[1300,145],
        [90,180],[240,160],[410,200],[580,170],[760,190],[920,165],[1100,185],[1260,175],
        [55,240],[220,220],[390,255],[550,235],[730,250],[890,225],[1060,240],[1220,260],
        [160,295],[320,280],[480,305],[640,285],[800,300],[960,275],[1120,295],[1380,270],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 1.2 : 0.7} fill="#f0e8d8" opacity={0.3 + (i % 5) * 0.08} />
      ))}

      {/* Far mountains — layer 5 (most distant, bluest) */}
      <path
        d="M0 620 L80 520 L160 580 L240 490 L340 540 L420 460 L520 510 L600 430 L700 480 L800 400 L900 450 L1000 380 L1100 430 L1200 360 L1300 410 L1380 370 L1440 400 L1440 900 L0 900 Z"
        fill="#1c1814"
        opacity="0.5"
        filter="url(#hl-blur-far)"
      />

      {/* Far mountains — layer 4 */}
      <path
        d="M0 680 L100 560 L200 620 L300 530 L400 590 L500 500 L600 560 L700 480 L800 540 L900 460 L1000 520 L1100 440 L1200 500 L1300 450 L1400 480 L1440 460 L1440 900 L0 900 Z"
        fill="#1a1510"
        opacity="0.7"
        filter="url(#hl-blur-far)"
      />

      {/* Mid mountains — layer 3 */}
      <path
        d="M0 720 L120 580 L220 650 L320 570 L450 630 L550 540 L660 610 L760 520 L880 590 L980 510 L1080 570 L1180 490 L1280 550 L1360 510 L1440 530 L1440 900 L0 900 Z"
        fill="#161210"
        opacity="0.85"
        filter="url(#hl-blur-mid)"
      />

      {/* Mid mountains — layer 2 with warm edge glow */}
      <path
        d="M0 760 L150 630 L260 700 L380 620 L490 690 L610 600 L720 670 L840 590 L950 660 L1060 580 L1170 640 L1270 580 L1370 620 L1440 600 L1440 900 L0 900 Z"
        fill="#12100e"
        opacity="0.92"
        filter="url(#hl-blur-near)"
      />

      {/* Mountain ridge warm rim light */}
      <path
        d="M0 760 L150 630 L260 700 L380 620 L490 690 L610 600 L720 670 L840 590 L950 660 L1060 580 L1170 640 L1270 580 L1370 620 L1440 600"
        stroke="#c8824a"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
        filter="url(#hl-blur-near)"
      />

      {/* Foreground hills — layer 1 (darkest) */}
      <path
        d="M0 820 L200 740 L350 790 L500 730 L650 780 L800 720 L950 760 L1100 710 L1250 750 L1440 720 L1440 900 L0 900 Z"
        fill="#0d0b09"
      />

      {/* Ground mist */}
      <path
        d="M0 820 Q360 800 720 815 Q1080 830 1440 810 L1440 870 Q1080 855 720 865 Q360 875 0 860 Z"
        fill="#1a1510"
        opacity="0.4"
        filter="url(#hl-blur-mid)"
      />

      {/* Atmospheric haze lines at horizon */}
      {[480, 490, 500, 510].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1440" y2={y} stroke="#c8824a" strokeOpacity={0.03 - i * 0.005} strokeWidth="1" />
      ))}
    </svg>
  );
}

/** Scene 02 — ABOUT: Misty valley with diffused light, intimate scale */
export function AboutLandscape({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="al-sky" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1e1812" />
          <stop offset="100%" stopColor="#080705" />
        </radialGradient>
        <radialGradient id="al-light" cx="50%" cy="55%" r="40%">
          <stop offset="0%" stopColor="#d4935a" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#d4935a" stopOpacity="0" />
        </radialGradient>
        <filter id="al-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="al-blur-soft">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="al-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1812" stopOpacity="0" />
          <stop offset="70%" stopColor="#1e1812" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1e1812" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="800" height="1000" fill="url(#al-sky)" />
      <ellipse cx="400" cy="550" rx="400" ry="300" fill="url(#al-light)" />

      {/* Stars */}
      {[
        [80,60],[200,40],[320,90],[480,30],[620,70],[740,45],
        [120,150],[280,130],[440,160],[580,140],[700,155],
        [60,220],[180,200],[340,240],[500,210],[660,230],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={0.8} fill="#f0e8d8" opacity={0.25 + (i % 4) * 0.07} />
      ))}

      {/* Distant ridges */}
      <path d="M0 500 L100 400 L200 450 L300 370 L400 420 L500 360 L600 410 L700 380 L800 400 L800 1000 L0 1000 Z"
        fill="#1a1410" opacity="0.6" filter="url(#al-blur)" />

      {/* Valley walls */}
      <path d="M0 600 L0 380 L120 460 L240 400 L360 470 L480 400 L600 460 L720 410 L800 440 L800 1000 L0 1000 Z"
        fill="#151210" opacity="0.8" filter="url(#al-blur)" />
      <path d="M0 1000 L0 700 L80 650 L160 680 L240 640 L320 670 L400 630 L480 660 L560 620 L640 650 L720 615 L800 640 L800 1000 Z"
        fill="#100e0c" opacity="0.9" />

      {/* Foreground darkness */}
      <path d="M0 780 L120 740 L240 760 L360 730 L480 750 L600 720 L720 745 L800 730 L800 1000 L0 1000 Z"
        fill="#0a0908" />

      {/* Mist overlay */}
      <rect width="800" height="1000" fill="url(#al-mist)" />

      {/* Atmospheric glow at valley center */}
      <ellipse cx="400" cy="600" rx="250" ry="80" fill="#d4935a" opacity="0.04" filter="url(#al-blur-soft)" />
    </svg>
  );
}

/** Scene 03 — CONTACT: Expansive horizon, open sky, final scene feeling */
export function ContactLandscape({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0806" />
          <stop offset="60%" stopColor="#18120c" />
          <stop offset="100%" stopColor="#0d0a08" />
        </linearGradient>
        <radialGradient id="cl-sun" cx="50%" cy="65%" r="50%">
          <stop offset="0%" stopColor="#c8724a" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#8b4a2e" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#8b4a2e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cl-purple" cx="80%" cy="40%" r="30%">
          <stop offset="0%" stopColor="#5a3a6e" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#5a3a6e" stopOpacity="0" />
        </radialGradient>
        <filter id="cl-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width="1440" height="700" fill="url(#cl-sky)" />
      <ellipse cx="720" cy="455" rx="700" ry="400" fill="url(#cl-sun)" />
      <ellipse cx="1152" cy="280" rx="430" ry="210" fill="url(#cl-purple)" />

      {/* Stars */}
      {[
        [90,50],[250,35],[430,75],[610,25],[780,60],[960,40],[1130,70],[1310,45],
        [140,120],[330,105],[510,135],[690,115],[870,130],[1050,100],[1230,120],[1400,140],
        [60,195],[220,175],[400,205],[570,185],[750,200],[930,175],[1100,195],[1280,180],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.1 : 0.6} fill="#f0e8d8" opacity={0.28 + (i % 6) * 0.06} />
      ))}

      {/* Vast distant plain / horizon mountains */}
      <path d="M0 520 L180 440 L360 490 L540 420 L720 460 L900 400 L1080 440 L1260 390 L1440 420 L1440 700 L0 700 Z"
        fill="#1a1510" opacity="0.5" filter="url(#cl-blur)" />
      <path d="M0 580 L200 510 L400 550 L600 480 L800 520 L1000 460 L1200 500 L1440 470 L1440 700 L0 700 Z"
        fill="#141210" opacity="0.75" filter="url(#cl-blur)" />
      <path d="M0 640 L300 590 L600 620 L900 580 L1200 610 L1440 585 L1440 700 L0 700 Z"
        fill="#0e0c0a" opacity="0.9" />
      <path d="M0 700 L250 665 L500 680 L750 658 L1000 672 L1250 655 L1440 668 L1440 700 L0 700 Z"
        fill="#090807" />

      {/* Horizon warm line */}
      <line x1="0" y1="450" x2="1440" y2="450" stroke="#c8724a" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="0" y1="455" x2="1440" y2="455" stroke="#c8724a" strokeOpacity="0.05" strokeWidth="1" />
    </svg>
  );
}
