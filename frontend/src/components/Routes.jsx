import React from "react";
import { Routes, Route } from "react-router-dom";

import IngresoList from "./IngresoList";
import DashBoard from "./DashBoard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>
        <h3>Dashboard</h3>
        <DashBoard />
      </div>} />
      <Route path="/ingresos" element={<div>
        <IngresoList />
      </div>} />
      <Route path="/gastos" element={<h3>Gastos</h3>} />
    </Routes>
  );
};

export default AppRoutes;
