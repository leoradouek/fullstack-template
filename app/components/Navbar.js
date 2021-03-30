import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Homepage</Link>
      <Link to="/robots">Robots</Link>
      <Link to="/projects">Projects</Link>
    </nav>
  );
};

export default Navbar;
