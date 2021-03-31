import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Homepage </Link>
        </li>
        <li>
          <Link to="/robots">Robots </Link>
        </li>
        <li>
          <Link to="/projects">Projects </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
