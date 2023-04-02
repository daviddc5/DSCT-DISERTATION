import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    // Navigation bar with a dark background
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Link to the home page */}
      <Link className="navbar-brand" to="/">
        My ToDo App
      </Link>

      {/* Button for toggling the navigation menu */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navigation menu */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {/* Link to the statistics page */}
          <li className="nav-item">
            <Link className="nav-link" to="/statistics">
              Statistics
            </Link>
          </li>

          {/* Link to the weekly page */}
          <li className="nav-item">
            <Link className="nav-link" to="/weekly">
              Weekly Page
            </Link>
          </li>

          {/* Link to the settings page */}
          <li className="nav-item">
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </li>

          {/* Link to the social page */}
          <li className="nav-item">
            <Link className="nav-link" to="/social">
              Social Page
            </Link>
          </li>

          {/* Link to the today page */}
          <li className="nav-item">
            <Link className="nav-link" to="/today">
              Today Page
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
