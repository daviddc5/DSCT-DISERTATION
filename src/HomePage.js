import React from "react";
import NavBar from "./NavBar/NavBar";



function HomePage() {
  return (
    <div>
      <NavBar />
      <h1>Welcome to Mindful Tasks!</h1>
      <p>
        This is a simple to-do list application that helps you organize your
        tasks and track your progress.
      </p>
      <p>
        Use the navigation bar above to access different parts of the app, such
        as the Today page, the Weekly page, the Statistics page, and more.
      </p>
    </div>
  );
}

export default HomePage;
