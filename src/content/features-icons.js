/**
 * FeatureIcons
 * ---------------------------------------------------------------
 * Hand-built line-art SVGs (beer mug, burger, boxing glove, guitar)
 * styled as glowing neon outlines via a drop-shadow filter — no
 * icon library has this specific set + look, so these are custom.
 *
 * Each icon is stroke-only, uses currentColor, and is meant to be
 * wrapped by <FeatureIconWrapper> (see FeaturesSection.jsx) which
 * applies the actual glow filter + color — keeps the raw glyphs
 * reusable elsewhere without the glow baked in.
 * ---------------------------------------------------------------
 */

export function BeerMugIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* foam bubbles */}
      <circle cx="22" cy="10" r="3" />
      <circle cx="30" cy="7" r="3.5" />
      <circle cx="38" cy="10" r="3" />
      {/* mug body */}
      <path d="M16 18 h26 v34 a4 4 0 0 1 -4 4 H20 a4 4 0 0 1 -4 -4 Z" />
      {/* liquid lines */}
      <path d="M16 30 h26" />
      {/* handle */}
      <path d="M42 24 h5 a5 5 0 0 1 5 5 v6 a5 5 0 0 1 -5 5 h-5" />
    </svg>
  );
}

export function BurgerIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* top bun */}
      <path d="M12 24 C12 14 20 8 32 8 C44 8 52 14 52 24 Z" />
      {/* sesame seeds */}
      <path d="M26 14 l2 -2" />
      <path d="M34 12 l2 -2" />
      <path d="M42 15 l2 -2" />
      {/* lettuce (wavy) */}
      <path d="M10 28 q4 -4 8 0 q4 4 8 0 q4 -4 8 0 q4 4 8 0 q4 -4 8 0 q4 4 8 0" />
      {/* patty */}
      <rect x="12" y="34" width="40" height="8" rx="3" />
      {/* bottom bun */}
      <path d="M10 46 h44 a2 2 0 0 1 2 2 v2 a4 4 0 0 1 -4 4 H12 a4 4 0 0 1 -4 -4 v-2 a2 2 0 0 1 2 -2 Z" />
    </svg>
  );
}

export function BoxingGloveIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* main mitt + thumb, single continuous outline */}
      <path d="M20 16 C11 16 6 24 7 32 C7.8 39 13 44 20 45 L38 45 C47 45 53 39 53 30 C53 21 47 15 38 15 C34 15 31 16.5 29 19 C26.5 15.5 23.5 16 20 16 Z" />
      {/* thumb separation */}
      <path d="M23 18 C18 21 17 27 21 32 C23 34.3 26 35.3 29 34.6" />
      {/* wrist cuff */}
      <path d="M38 45 L38 54 C38 56.5 40 58 42.5 58 L46 58 C48.5 58 50.5 56.5 50.5 54 L50.5 40" />
      <path d="M38 51 L50.5 51" />
      {/* knuckle seams */}
      <path d="M31 22 C34 26 34 34 31 39" />
      <path d="M39 20 C42 26 42 34 39 41" />
    </svg>
  );
}

export function GuitarIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g transform="translate(0 -2) rotate(-28 32 32)">
        {/* headstock */}
        <path d="M27 4 L37 4 C39.5 4 41 5.8 41 8.2 L41 11 C41 13.5 39 15.5 36.5 15.5 L27.5 15.5 C25 15.5 23 13.5 23 11 L23 8.2 C23 5.8 24.5 4 27 4 Z" />
        {/* tuning pegs */}
        <circle cx="27" cy="7.5" r="1.3" fill="currentColor" />
        <circle cx="37" cy="7.5" r="1.3" fill="currentColor" />
        <circle cx="32" cy="11.5" r="1.3" fill="currentColor" />
        {/* neck */}
        <path d="M26.5 15.5 L28.5 40" />
        <path d="M37.5 15.5 L35.5 40" />
        {/* frets */}
        <path d="M27 21 L37 21" />
        <path d="M27.4 27 L36.6 27" />
        <path d="M27.8 33 L36.2 33" />
        {/* body — figure-8 lower bout larger than upper bout */}
        <path d="M28.5 40 C20 40 14 46 14 53 C14 59.5 20.5 64 28 64 C34 64 39 60.5 39 55 C39 51.5 37 49 34 48 C39 47 42 43.5 42 39 C42 33.5 37.5 30 32 30.5 C30 30.7 28.8 32 28.5 40 Z" />
        {/* soundhole */}
        <circle cx="27" cy="53" r="5.5" />
        {/* bridge */}
        <path d="M22 61 L32 61" />
      </g>
    </svg>
  );
}

export function TVScreenIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* screen */}
      <rect x="6" y="10" width="52" height="34" rx="3" />
      {/* stand */}
      <path d="M32 44 L32 52" />
      <path d="M20 58 L44 58" />
      <path d="M32 52 L20 58" />
      <path d="M32 52 L44 58" />
      {/* on-screen "live game" glyph — scoreboard-ish bars + a ball */}
      <circle cx="24" cy="27" r="5" />
      <path d="M35 22 L52 22" />
      <path d="M35 27 L48 27" />
      <path d="M35 32 L44 32" />
    </svg>
  );
}

export function BilliardsIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* 8-ball */}
      <circle cx="20" cy="44" r="18" />
      <circle cx="20" cy="44" r="8" fill="currentColor" stroke="none" />
      <text
        x="20"
        y="47.5"
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
        fill="white"
        stroke="none"
      >
        8
      </text>
    </svg>
  );
}

export function TrophyIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10 h24 v14 c0 8 -5.5 14 -12 14 s-12 -6 -12 -14 Z" />
      <path d="M20 14 h-6 a4 4 0 0 0 -4 4 v2 a8 8 0 0 0 8 8" />
      <path d="M44 14 h6 a4 4 0 0 1 4 4 v2 a8 8 0 0 1 -8 8" />
      <path d="M32 38 v8" />
      <path d="M24 54 h16" />
      <path d="M26 46 h12 l2 8 h-16 Z" />
    </svg>
  );
}

export function MusicNoteIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M24 42 V14 L46 8 V36" />
      <circle cx="18" cy="46" r="7" />
      <circle cx="40" cy="40" r="7" />
    </svg>
  );
}

export function CommunityIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="22" cy="20" r="7" />
      <circle cx="42" cy="20" r="7" />
      <path d="M8 46 c0 -9 6.5 -15 14 -15 s14 6 14 15" />
      <path d="M28 46 c0 -9 6.5 -15 14 -15 s14 6 14 15" />
    </svg>
  );
}
