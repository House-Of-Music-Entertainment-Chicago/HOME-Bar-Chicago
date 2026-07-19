import React from "react";

function Title({ children, className }) {
  return (
    <h3
      className={`${className} text-sm md:text-md lg:text-lg font-display font-bold tracking-wide`}
    >
      {children}
    </h3>
  );
}

export default Title;
