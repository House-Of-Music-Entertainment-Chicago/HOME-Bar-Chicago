import React from "react";

function Container({ children, className }) {
  return (
    <div className={`${className} container mx-auto py-15 px-5`}>
      {children}
    </div>
  );
}

export default Container;
