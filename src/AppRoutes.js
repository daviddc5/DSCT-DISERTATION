import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import StatisticsPage from "./StatisticsPage/StatisticsPage";
import WeeklyPage from "./WeeklyPage";
import SocialPage from "./SocialPage/SocialPage";
import NewTask from "./NewTask/NewTask";
import TodayPage from "./TodayPage/TodayPage";
// import initial todos
import InitialTodos from "./NewTask/InitialTodos";

function AppRoutes() {
  // sets todos to local storage
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : InitialTodos;
  });

 //chartdata
  const [chartData, setChartData] = useState(() => {
    const storedChartData = localStorage.getItem("chartData");
    return storedChartData ? JSON.parse(storedChartData) : [];
  });

  //chartdata for the completion status of tasks over time
  
// Initialize the state from localStorage or use the initial value
const [completionOfTasksStats, setCompletionOfTasksStats] = useState(() => {
  const storedStats = localStorage.getItem("completionOfTasksStats");
  return storedStats ? JSON.parse(storedStats) : { shortTerm: {}, longTerm: {} };
});




  const [timerSettings, setTimerSettings] = useState({
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  });

  const handleSettingsChange = (newSettings) => {
    setTimerSettings(newSettings.timerSettings);
  };


  // Update localStorage whenever completionOfTasksStats changes
useEffect(() => {
  localStorage.setItem("completionOfTasksStats", JSON.stringify(completionOfTasksStats));
  // console.log('completionOfTasksStats updated:', completionOfTasksStats); // log the updated value
}, [completionOfTasksStats]);

  // makes local storage data stored as json into strings
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Update localStorage whenever chartData changes
  useEffect(() => {
    localStorage.setItem("chartData", JSON.stringify(chartData));
  }, [chartData]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} index={true} />
      <Route
        path="/settings"
        element={<SettingsPage onSettingsChange={handleSettingsChange} />}
      />
      <Route
        path="/statistics"
        element={<StatisticsPage todos={todos} chartData={chartData} setChartData={setChartData} completionOfTasksStats= {completionOfTasksStats} />}
      />
      <Route
        path="/weekly"
        element={<WeeklyPage todos={todos} setTodos={setTodos} />}
      />
      <Route path="/social" element={<SocialPage todos={todos} />} />
      <Route path="/newTask" element={<NewTask todos={todos} setTodos={setTodos} completionOfTasksStats= {completionOfTasksStats} setCompletionOfTasksStats={setCompletionOfTasksStats} />} />
      <Route
        path="/today"
        element={
          <TodayPage
            todos={todos}
            setTodos={setTodos}
            initialTodos={InitialTodos}
            timerSettings={timerSettings}
            chartData={chartData}
            // setChartData={setChartData}
            
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
