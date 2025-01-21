import React from "react";
import { Routes, Route } from "react-router-dom";

import IngresoList from "./IngresoList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h3>Dashboard</h3>} />
      <Route path="/ingresos" element={<div>
        <h3>Ingresos</h3>
        <IngresoList />
      </div>} />
      <Route path="/gastos" element={<h3>Gastos</h3>} />
    </Routes>
  );
};

export default AppRoutes;
