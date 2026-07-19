import React from "react";

function Subheading({ children, className }) {
  return (
    <h2
      className={`${className} text-4xl md:text-6xl xl:text-8xl font-heading font-bold`}
    >
      {children}
    </h2>
  );
}

export default Subheading;
