import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";

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
         
          <Nav.Link as={NavLink} to="/today" activeclassname="active">
            Today Page
          </Nav.Link>
          <Nav.Link as={NavLink} to="/weekly" activeclassname="active">
            Weekly Page
          </Nav.Link>
          <Nav.Link as={NavLink} to="/newTask" activeclassname="active">
            New task
          </Nav.Link>
          <Nav.Link as={NavLink} to="/statistics" activeclassname="active">
            Statistics
          </Nav.Link>
          <Nav.Link as={NavLink} to="/social" activeclassname="active">
            Social Page
          </Nav.Link>
  
          <Nav.Link as={NavLink} to="/settings" activeclassname="active">
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
