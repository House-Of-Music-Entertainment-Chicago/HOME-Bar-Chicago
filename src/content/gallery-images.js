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

  /* ---------------- Bears game watch party ----------------
     Photos by Daniela Marie Photography. Kept at the end of the list on
     purpose: the About page preview strip takes the first entries, so
     appending here adds them to /gallery without changing that strip.
     Each one is still tagged with the filter that matches what it shows. */
  {
    src: "/images/gallery/bears-game/bears-game-01.jpeg",
    category: "events",
    alt: "Bears fans gathered around the high-top tables on game day",
  },
  {
    src: "/images/gallery/bears-game/bears-game-02.jpeg",
    category: "events",
    alt: "Fans in Bears gear catching up at the high-tops",
  },
  {
    src: "/images/gallery/bears-game/bears-game-03.jpeg",
    category: "events",
    alt: "A packed main floor for the Bears game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-04.jpeg",
    category: "venue",
    alt: "Bartender in a Bears jersey working the bar under the big screens",
  },
  {
    src: "/images/gallery/bears-game/bears-game-05.jpeg",
    category: "events",
    alt: "Fans settled into the lounge seating to watch the game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-06.jpeg",
    category: "events",
    alt: "The lounge crowd locked in on the Bears game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-07.jpeg",
    category: "events",
    alt: "Game-day pizzas laid out beside the packed lounge",
  },
  {
    src: "/images/gallery/bears-game/bears-game-08.jpeg",
    category: "events",
    alt: "Fans mingling around the lounge with pizzas on the table",
  },
  {
    src: "/images/gallery/bears-game/bears-game-09.jpeg",
    category: "events",
    alt: "The Bears game on the giant stage screens beside the lounge sofas",
  },
  {
    src: "/images/gallery/bears-game/bears-game-10.jpeg",
    category: "events",
    alt: "Fans in orange and navy sharing a meal at the dining tables",
  },
  {
    src: "/images/gallery/bears-game/bears-game-11.jpeg",
    category: "events",
    alt: "Tables full of Bears fans on the main floor",
  },
  {
    src: "/images/gallery/bears-game/bears-game-12.jpeg",
    category: "events",
    alt: "Fans digging into game-day food on the main floor",
  },
  {
    src: "/images/gallery/bears-game/bears-game-13.jpeg",
    category: "events",
    alt: "Friends in Bears gear smiling for the camera at their table",
  },
  {
    src: "/images/gallery/bears-game/bears-game-14.jpeg",
    category: "events",
    alt: "A table of Bears fans posing in front of the Wall of Champions",
  },
  {
    src: "/images/gallery/bears-game/bears-game-15.jpeg",
    category: "food",
    alt: "Our server bringing out a cheeseburger and fries",
  },
  {
    src: "/images/gallery/bears-game/bears-game-16.jpeg",
    category: "events",
    alt: "Fans watching from the lounge with wings and pizza up front",
  },
  {
    src: "/images/gallery/bears-game/bears-game-17.jpeg",
    category: "events",
    alt: "The lounge crowd with platters of game-day food",
  },
  {
    src: "/images/gallery/bears-game/bears-game-18.jpeg",
    category: "events",
    alt: "Bears fans filling the lounge by the stage",
  },
  {
    src: "/images/gallery/bears-game/bears-game-19.jpeg",
    category: "play",
    alt: "A fan in a Bears jersey lining up a shot at the pool table",
  },
  {
    src: "/images/gallery/bears-game/bears-game-20.jpeg",
    category: "events",
    alt: "A group of friends in Bears gear smiling at their table",
  },
  {
    src: "/images/gallery/bears-game/bears-game-21.jpeg",
    category: "events",
    alt: "Friends in Bears jerseys posing at their high-top",
  },
  {
    src: "/images/gallery/bears-game/bears-game-22.jpeg",
    category: "food",
    alt: "Friends sharing a pizza at the bar tables",
  },
  {
    src: "/images/gallery/bears-game/bears-game-23.jpeg",
    category: "events",
    alt: "Fans in Bears jerseys enjoying drinks at their table",
  },
  {
    src: "/images/gallery/bears-game/bears-game-24.jpeg",
    category: "play",
    alt: "Two fans in Bears jerseys getting ready to play pool",
  },
  {
    src: "/images/gallery/bears-game/bears-game-25.jpeg",
    category: "events",
    alt: "Fans packing the lounge and high-tops for the Bears game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-26.jpeg",
    category: "events",
    alt: "A full house on the main floor watching the game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-27.jpeg",
    category: "events",
    alt: "The game on the big screen in the back room",
  },
  {
    src: "/images/gallery/bears-game/bears-game-28.jpeg",
    category: "venue",
    alt: "Close-up of a signed Bears #84 jersey",
  },
  {
    src: "/images/gallery/bears-game/bears-game-29.jpeg",
    category: "venue",
    alt: "A signed #84 Loveland Bears jersey on display",
  },
  {
    src: "/images/gallery/bears-game/bears-game-30.jpeg",
    category: "venue",
    alt: "The fully stocked main bar under the screens",
  },
  {
    src: "/images/gallery/bears-game/bears-game-31.jpeg",
    category: "venue",
    alt: "Bartenders in Bears jerseys working the bar",
  },
  {
    src: "/images/gallery/bears-game/bears-game-32.jpeg",
    category: "venue",
    alt: "Fans lined up at the bar watching the game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-33.jpeg",
    category: "food",
    alt: "Fans sharing pizza at the dining tables",
  },
  {
    src: "/images/gallery/bears-game/bears-game-34.jpeg",
    category: "events",
    alt: "A fan in a Bears jersey celebrating in front of the big screen",
  },
  {
    src: "/images/gallery/bears-game/bears-game-35.jpeg",
    category: "events",
    alt: "A packed dining room of Bears fans watching the game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-36.jpeg",
    category: "events",
    alt: "Fans in Bears orange watching from beneath the Wall of Champions",
  },
  {
    src: "/images/gallery/bears-game/bears-game-37.jpeg",
    category: "play",
    alt: "A fan in a Bears jersey all smiles with a pool cue",
  },
  {
    src: "/images/gallery/bears-game/bears-game-38.jpeg",
    category: "play",
    alt: "A game of pool on the Diamond tables during the Bears game",
  },
  {
    src: "/images/gallery/bears-game/bears-game-39.jpeg",
    category: "events",
    alt: "Fans at the high-tops under the Bear Down banner",
  },
  {
    src: "/images/gallery/bears-game/bears-game-40.jpeg",
    category: "venue",
    alt: "Bartender serving a fan in a Bears jersey",
  },
  {
    src: "/images/gallery/bears-game/bears-game-41.jpeg",
    category: "events",
    alt: "Tables full of fans beneath the Wall of Champions",
  },
  {
    src: "/images/gallery/bears-game/bears-game-42.jpeg",
    category: "events",
    alt: "Fans watching the game in front of the Wall of Champions",
  },
  {
    src: "/images/gallery/bears-game/bears-game-43.jpeg",
    category: "events",
    alt: "Fans packed in at the bar tables under the screens",
  },
  {
    src: "/images/gallery/bears-game/bears-game-44.jpeg",
    category: "events",
    alt: "Fans relaxing on the lounge sofas with pizza and drinks",
  },
  {
    src: "/images/gallery/bears-game/bears-game-45.jpeg",
    category: "events",
    alt: "Fans cheering a big play at the bar tables",
  },
  {
    src: "/images/gallery/bears-game/bears-game-46.jpeg",
    category: "events",
    alt: "Fans on their feet celebrating a Bears play",
  },
  {
    src: "/images/gallery/bears-game/bears-game-47.jpeg",
    category: "events",
    alt: "The crowd cheering in front of the wall of screens",
  },
  {
    src: "/images/gallery/bears-game/bears-game-48.jpeg",
    category: "events",
    alt: "Fans celebrating a Bears score at the bar tables",
  },
  {
    src: "/images/gallery/bears-game/bears-game-49.jpeg",
    category: "events",
    alt: "Fans cheering from the lounge sofas",
  },
  {
    src: "/images/gallery/bears-game/bears-game-50.jpeg",
    category: "events",
    alt: "Fans watching intently beneath the Wall of Champions",
  },
  {
    src: "/images/gallery/bears-game/bears-game-51.jpeg",
    category: "drinks",
    alt: "A tray of orange shots lined up for the crowd",
  },
  {
    src: "/images/gallery/bears-game/bears-game-52.jpeg",
    category: "drinks",
    alt: "A round of orange shots ready to hand out",
  },
  {
    src: "/images/gallery/bears-game/bears-game-53.jpeg",
    category: "drinks",
    alt: "A cocktail on the rocks with a fresh lime wedge",
  },
  {
    src: "/images/gallery/bears-game/bears-game-54.jpeg",
    category: "drinks",
    alt: "A lime cocktail over ice on the bar top",
  },
  {
    src: "/images/gallery/bears-game/bears-game-55.jpeg",
    category: "drinks",
    alt: "A house cocktail served over ice with lime",
  },
  {
    src: "/images/gallery/bears-game/bears-game-56.jpeg",
    category: "drinks",
    alt: "A lime cocktail on ice under the bar lights",
  },
  {
    src: "/images/gallery/bears-game/bears-game-57.jpeg",
    category: "drinks",
    alt: "A shimmering blue cocktail in a coupe glass",
  },
  {
    src: "/images/gallery/bears-game/bears-game-58.jpeg",
    category: "drinks",
    alt: "A sparkling blue coupe cocktail at the bar",
  },
  {
    src: "/images/gallery/bears-game/bears-game-59.jpeg",
    category: "drinks",
    alt: "A glittering blue cocktail served in a coupe",
  },
  {
    src: "/images/gallery/bears-game/bears-game-60.jpeg",
    category: "drinks",
    alt: "A frosted blue coupe cocktail on the bar top",
  },
  {
    src: "/images/gallery/bears-game/bears-game-61.jpeg",
    category: "drinks",
    alt: "A blue shimmer cocktail in a stemmed coupe",
  },
];

export default GALLERY_IMAGES;
