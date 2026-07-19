import React from "react";

function Heading({ children, className }) {
  return (
    <h1
      className={`${className} text-5xl md:text-7xl xl:text-9xl font-heading font-semibold`}
    >
      {children}
    </h1>
  );
}

export default Heading;
