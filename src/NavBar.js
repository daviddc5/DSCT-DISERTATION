import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./styles/NavBar.css";

function NavBar() {
  return (
    // Create a dark-themed responsive navbar using react-bootstrap components
    <Navbar bg="dark" expand="lg" variant="dark" style={{ backgroundColor: "#050624" }}>

      {/* Navbar brand/title linking to the home page */}
      <Navbar.Brand as={Link} to="/">
        Mindful Tasks
      </Navbar.Brand>

      {/* Hamburger menu button for mobile view */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Collapsible navbar section containing navigation links */}
      <Navbar.Collapse id="basic-navbar-nav">
        {/* Align the navigation links to the right */}
        <Nav className="ml-auto">
          {/* Individual navigation links */}
          <Nav.Link as={NavLink} to="/" exact activeClassName="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/today" activeClassName="active">
            Today Page
          </Nav.Link>
          <Nav.Link as={NavLink} to="/weekly" activeClassName="active">
            Weekly Page
          </Nav.Link>
          <Nav.Link as={NavLink} to="/newTask" activeClassName="active">
            New task
          </Nav.Link>
          <Nav.Link as={NavLink} to="/social" activeClassName="active">
            Social Page
          </Nav.Link>
          <Nav.Link as={NavLink} to="/statistics" activeClassName="active">
            Statistics
          </Nav.Link>
          <Nav.Link as={NavLink} to="/settings" activeClassName="active">
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
