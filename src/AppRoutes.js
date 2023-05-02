import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import StatisticsPage from "./StatisticsPage";
import WeeklyPage from "./WeeklyPage";
import SocialPage from "./SocialPage";
import NewTask from "./NewTask/NewTask";
import TodayPage from "./TodayPage/TodayPage";

function AppRoutes() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [timerSettings, setTimerSettings] = useState({
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  });

  const handleSettingsChange = (newSettings) => {
    setTimerSettings(newSettings.timerSettings);
  };

  // Dummy users data
  const users = [
    { id: 1, name: "L", icon: "/path/to/icon1.png", goal: "Learn React" },
    { id: 2, name: "Adrian", icon: "/path/to/icon2.png", goal: "Learn Node.js" },
    // ...
  ];

  const currentUser = {
    id: 1, // Set the logged-in user's id
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} index={true} />
      <Route
        path="/settings"
        element={<SettingsPage onSettingsChange={handleSettingsChange} />}
      />
      <Route
        path="/statistics"
        element={<StatisticsPage todos={todos} setTodos={setTodos} chartData={chartData} setChartData={setChartData} />}
      />
      <Route
        path="/weekly"
        element={<WeeklyPage todos={todos} setTodos={setTodos} />}
      />
      <Route
        path="/social"
        element={<SocialPage users={users} currentUser={currentUser} />}
      />
      <Route path="/newTask" element={<NewTask todos={todos} setTodos={setTodos} />} />
      <Route
        path="/today"
        element={
          <TodayPage
            todos={todos}
            setTodos={setTodos}
            timerSettings={timerSettings}
            chartData={chartData}
            setChartData={setChartData}
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
