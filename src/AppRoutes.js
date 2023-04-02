import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import SettingsPage from './SettingsPage';
import StatisticsPage from './StatisticsPage';
import WeeklyPage from './WeeklyPage';
import SocialPage from './SocialPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/weekly" element={<WeeklyPage />} />
      <Route path="/social" element={<SocialPage />} />
    </Routes>
  );
}

export default AppRoutes;
