import React, { useState } from "react";

const Alert = ({ closeFunction, children }) => {
  const [scrolled, setScrolled] = useState(false);

  const scroll = () => {
    window.scrollTo(0, 0);
    setScrolled(true);
  };

  return (
    <div id="alert" className="alert">
      {closeFunction && (
        <span class="closebtn" onClick={closeFunction}>
          &times;
        </span>
      )}
      {children}
      {scrolled === false && scroll()}
    </div>
  );
};

export default Alert;
