import React from "react";
import NavBar from "./NavBar"

function TodayPage() {
  return (
    <div>
      <NavBar/>
      <h1>Today's Tasks</h1>
      <p>Here are your tasks for today:</p>
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
  );
}

export default TodayPage;
