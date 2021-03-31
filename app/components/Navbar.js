import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            Home <i className="fa fa-home"></i>
          </Link>
        </li>
        <li>
          <Link to="/robots">
            Robots <i className="fa fa-user"></i>
          </Link>
        </li>
        <li>
          <Link to="/projects">
            Projects <i className="fa fa-sticky-note-o"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
