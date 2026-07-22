import React from "react";
import MenuHero from "@/components/pages/menu/MenuHeroSection";
import MenuHighlights from "@/components/pages/menu/MenuHighlightsSection";
import FoodMenuSection from "@/components/pages/menu/FoodMenuSection";
import DrinksMenuSection from "@/components/pages/menu/DrinksMenuSection";
import CTASection from "@/components/pages/home/CTASection";

export const metadata = {
  title: "Menu",
  description:
    "Explore HOME Sports Bar's full food and drinks menu — signature burgers, wings, pizza, cocktails, and more.",
  alternates: { canonical: "/menu" },
};

function Menu() {
  return (
    <>
      <MenuHero />
      <MenuHighlights />
      <FoodMenuSection />
      <DrinksMenuSection />
      <CTASection />
    </>
  );
}

export default Menu;
