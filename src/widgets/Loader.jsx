import React from "react";

const Loader = ({ relative = false }) => {
  return (
    <div
      className="loader"
      style={{
        position: relative ? "absolute" : "fixed",
      }}
    >
      <div className="gooey">
        <span className="dot" />
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default Loader;
