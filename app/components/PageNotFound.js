import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="not-found">
      <h1>404 Page Not Found</h1>
      <h5>
        Nothing to see here so you might as well{" "}
        <Link to="/">go back to homepage</Link>{" "}
      </h5>
      <img src="http://consumersresearch.org/wp-content/uploads/2019/02/Sad-Robot-1024x575.jpg" />
    </div>
  );
};

export default PageNotFound;
