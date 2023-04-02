import React from 'react';

import { createRoot } from 'react-dom/client';


import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
// bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";



const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);