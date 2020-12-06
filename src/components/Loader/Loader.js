import React from "react";
import "./Loader.scss";
const Loader = () => {
  return (
    <div className="loader">
      <img src={process.env.PUBLIC_URL + "/img/day.svg"} alt="weather" />
    </div>
  );
};

export default Loader;
