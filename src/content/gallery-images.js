/**
 * GALLERY IMAGES
 * ---------------------------------------------------------------
 * Every real photograph used across the site, grouped by what it
 * actually shows. This is the single source for /gallery and for the
 * preview strip on the About page, so a new photo only has to be added
 * once.
 *
 * Deliberately excluded: UI chrome and textures that aren't photos of
 * the venue — ribbons, pennants, date banners, the flourish, the torn
 * paper divider, and section-bg-1 (a concrete texture used as backdrop).
 * Those are design assets, not gallery content.
 *
 * Alt text is written from the actual image content rather than the
 * filename, so screen-reader users get the same information sighted
 * visitors do.
 */

export const GALLERY_CATEGORIES = [
  { id: "venue", label: "The Venue" },
  { id: "play", label: "Play" },
  { id: "food", label: "Food" },
  { id: "drinks", label: "Drinks" },
  { id: "events", label: "Live & Events" },
];

export const GALLERY_IMAGES = [
  /* ---------------- The Venue ---------------- */
  {
    src: "/images/venue/bar-counter.png",
    category: "venue",
    alt: "Guests gathered along the main bar counter under neon lighting",
  },
  {
    src: "/images/venue/pool-and-tables-area.png",
    category: "venue",
    alt: "The main floor at HOME — high-top tables and pool tables under coloured ceiling lights",
  },
  {
    src: "/images/venue/tables-area.png",
    category: "venue",
    alt: "Rows of high-top seating facing the wall of screens",
  },
  {
    src: "/images/venue/main-area-crowd.jpeg",
    category: "venue",
    alt: "Main area crowd",
  },
  {
    src: "/images/venue/pool-area-crowd.jpeg",
    category: "venue",
    alt: "Crowd in our pool area",
  },
  {
    src: "/images/entertainment/live-band-crowd.jpeg",
    category: "venue",
    alt: "Inside HOME Sports Bar",
  },

  /* ---------------- Play ---------------- */
  {
    src: "/images/venue/pool-room.png",
    category: "play",
    alt: "Fast Eddie's Pool Room — Diamond tables with blue felt beneath a hand-painted mural",
  },
  {
    src: "/images/venue/pool-table.png",
    category: "play",
    alt: "A single Diamond pool table set up for a break",
  },
  {
    src: "/images/venue/golf-sims.png",
    category: "play",
    alt: "Golf simulator bays with courses projected on the screens",
  },
  {
    src: "/images/venue/golf-sim-bays.jpeg",
    category: "play",
    alt: "The full row of golf simulator bays",
  },
  {
    src: "/images/venue/games-area.png",
    category: "play",
    alt: "The gaming area — machines lit up with sports playing on the screens above",
  },
  {
    src: "/images/venue/darts.jpg",
    category: "play",
    alt: "A guest lining up a throw at the Bull Shooter electronic dartboard",
  },
  // {
  //   src: "/images/_unused/arcade-basketball.jpg",
  //   category: "play",
  //   alt: "A guest with a drink at the arcade basketball hoops machine",
  // },

  /* ---------------- Food ---------------- */
  {
    src: "/images/menu/food/food-bundle.jpeg",
    category: "food",
    alt: "A spread of HOME favourites — tacos, sliders, burger, salad and loaded frots",
  },
  {
    src: "/images/menu/food/burger-w-fries.jpeg",
    category: "food",
    alt: "The HOME MVP Burger with fries and pickles",
  },
  {
    src: "/images/menu/food/the-philly-sandwich.jpeg",
    category: "food",
    alt: "The Philly — steak, provolone and peppers on a hoagie roll with fries",
  },
  {
    src: "/images/menu/food/corned-beef-reuben.jpeg",
    category: "food",
    alt: "Corned Beef Reuben on grilled rye with fries and pickles",
  },
  {
    src: "/images/menu/food/sandwich-w-fries.jpeg",
    category: "food",
    alt: "Triple Decker Club stacked on toasted sourdough with fries",
  },
  {
    src: "/images/menu/food/special-pizza.jpeg",
    category: "food",
    alt: "The 14-inch HOME Bar Special Pizza",
  },
  {
    src: "/images/menu/food/buffalo-wings.jpeg",
    category: "food",
    alt: "Chicken wings tossed and served with dipping sauce",
  },
  {
    src: "/images/menu/food/mozzarella-sticks.jpeg",
    category: "food",
    alt: "Jumbo mozzarella sticks in a fry basket with marinara",
  },
  {
    src: "/images/menu/food/onion-ring-tower.jpeg",
    category: "food",
    alt: "The Onion Ring Tower stacked tall with four dipping sauces",
  },
  {
    src: "/images/menu/food/loaded-frots.jpeg",
    category: "food",
    alt: "Loaded Frots — fries and tater tots with bacon, cheese, jalapeños and sour cream",
  },
  {
    src: "/images/menu/food/nachos.jpeg",
    category: "food",
    alt: "Nachos layered with cheese, jalapeños, pico de gallo and guacamole",
  },
  {
    src: "/images/menu/food/cheese-quesadilla.jpeg",
    category: "food",
    alt: "Cheese quesadilla with guacamole, pico de gallo and sour cream",
  },
  {
    src: "/images/menu/food/spinach-artichoke-dip.jpeg",
    category: "food",
    alt: "Spinach and artichoke dip served with tortilla chips",
  },
  {
    src: "/images/menu/food/chicken-sliders.jpeg",
    category: "food",
    alt: "Three fried chicken sliders on a tray with pickles",
  },
  {
    src: "/images/menu/food/signature-tacos-trio.jpeg",
    category: "food",
    alt: "HOME signature tacos with salsa, guacamole and pico de gallo",
  },
  {
    src: "/images/menu/food/mac-and-cheese-short-rib.jpeg",
    category: "food",
    alt: "Mac and cheese topped with short rib and crispy onion straws",
  },
  {
    src: "/images/menu/food/rice-w-shrimp.jpeg",
    category: "food",
    alt: "Sautéed shrimp bowl with brussels sprouts, tomatoes and brown rice",
  },
  {
    src: "/images/menu/food/southwest-salad.jpeg",
    category: "food",
    alt: "Southwest salad with black beans, corn, avocado and tortilla strips",
  },
  {
    src: "/images/menu/food/chicken-lemon-rice-soup.jpeg",
    category: "food",
    alt: "Chicken lemon rice soup served with crackers",
  },
  {
    src: "/images/menu/food/warm-cookie-skillet.jpeg",
    category: "food",
    alt: "Warm cookie skillet topped with vanilla ice cream",
  },
  {
    src: "/images/menu/food/burger-and-mac-spread.jpg",
    category: "food",
    alt: "Burger, mac and cheese, sweet potato fries and a cocktail on a lounge table",
  },

  /* ---------------- Drinks ---------------- */
  {
    src: "/images/menu/drinks/beer-flights.png",
    category: "drinks",
    alt: "Beer flights lined up on the bar beneath the neon-lit screens",
  },
  {
    src: "/images/menu/drinks/beer.jpg",
    category: "drinks",
    alt: "An ice-cold beer poured at the bar",
  },
  {
    src: "/images/menu/drinks/drink-1.webp",
    category: "drinks",
    alt: "A margarita served with lime and a salted rim",
  },
  {
    src: "/images/menu/drinks/drink-2.webp",
    category: "drinks",
    alt: "A signature cocktail garnished with fresh mint",
  },
  {
    src: "/images/menu/drinks/cocktail-tray.jpg",
    category: "drinks",
    alt: "Cocktails on a tray with fresh mint and house bitters",
  },
  {
    src: "/images/menu/drinks/cocktails-on-the-rail.jpg",
    category: "drinks",
    alt: "A row of colourful cocktails along the bar rail with the games floor behind",
  },

  /* ---------------- Live & Events ---------------- */
  {
    src: "/images/entertainment/live-band.png",
    category: "events",
    alt: "A live band on stage under blue and purple stage lighting",
  },
  {
    src: "/images/entertainment/live-dj.jpg",
    category: "events",
    alt: "A DJ mixing on decks during a night at HOME",
  },
  {
    src: "/images/entertainment/live-wrestling.jpg",
    category: "events",
    alt: "Live wrestling in the ring with the crowd ringside",
  },
  {
    src: "/images/entertainment/watch-sports.jpeg",
    category: "events",
    alt: "The projector screen and wall TVs showing a Cubs game",
  },
];

export default GALLERY_IMAGES;
