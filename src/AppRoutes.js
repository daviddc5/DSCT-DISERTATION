import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';
import SettingsPage from './SettingsPage';
import StatisticsPage from './StatisticsPage';
import WeeklyPage from './WeeklyPage';
import SocialPage from './SocialPage';
import NewTask from './NewTask/NewTask';
import TodayPage from './TodayPage';

function AppRoutes() {
  const [todos, setTodos] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} index={true} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/weekly" element={<WeeklyPage todos={todos} setTodos={setTodos} />} />
      <Route path="/social" element={<SocialPage />} />
      <Route path="/newTask" element={<NewTask todos={todos} setTodos={setTodos} />} />
      <Route path="/today" element={<TodayPage />} />
    </Routes>
  );
}


export default AppRoutes;
