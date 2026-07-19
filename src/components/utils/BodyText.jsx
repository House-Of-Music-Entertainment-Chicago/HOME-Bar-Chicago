import React from "react";

const Text = ({ children, className }) => {
  return (
    <p
      className={`${className} text-xs md:text-sm lg:text-md font-body font-semibold`}
    >
      {children}
    </p>
  );
};

export default Text;
