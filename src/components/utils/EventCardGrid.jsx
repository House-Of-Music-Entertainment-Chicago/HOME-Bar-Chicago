import EventCard from "./EventCard";

/**
 * EventCardGrid
 * ---------------------------------------------------------------
 * Lays out EventCards in a 2-column grid, but "scattered" rather
 * than gridded:
 *
 *   1. TILT — each card gets its own small rotation, pulled from a
 *      repeating pattern (not Math.random!). Random rotation would
 *      cause a hydration mismatch in Next.js, since the server and
 *      client would each generate different numbers — a fixed
 *      pattern array gives you the same "random-looking" variety
 *      without ever disagreeing between server/client render.
 *
 *   2. STAGGER — the two columns are pushed by different vertical
 *      offsets (translateY), so row 1 in column A doesn't line up
 *      with row 1 in column B. That's what breaks the "aligned
 *      grid" look in the mockup.
 *
 * Tune ROTATIONS / COLUMN_OFFSETS below to taste — more extreme
 * values = more chaotic scrapbook feel, smaller values = subtler.
 * ---------------------------------------------------------------
 */

// Repeating rotation pattern (degrees), cycled by item index.
const ROTATIONS = [6];

// Vertical offset per column (px). Column 0 sits a bit higher,
// column 1 sits a bit lower, so the two columns "interlock" rather
// than lining up row by row.
const COLUMN_OFFSETS = [0, 28];

export default function EventCardGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 w-full">
      {items.map((item, i) => {
        // const rotation = ROTATIONS[i % ROTATIONS.length];
        const rotation = 0;
        // const column = i % 0; // swap to `i % 3` if you go 3-column on desktop
        // const offsetY = COLUMN_OFFSETS[column];
        const offsetY = 0;

        return (
          <div
            key={item.id ?? i}
            className="transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-105"
            style={{
              transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
            }}
          >
            <EventCard
              image={item.image}
              alt={item.alt}
              bgImage={item.bgImage}
              bgAlt={item.bgAlt}
            />
          </div>
        );
      })}
    </div>
  );
}
