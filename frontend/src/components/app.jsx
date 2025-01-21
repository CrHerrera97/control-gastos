import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MyNavbar from './navbar';
import AppRoutes from "./Routes";

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <AppRoutes />
    </Router>
  );
};

export default App;