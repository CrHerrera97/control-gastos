import React from "react";
import { Routes, Route } from "react-router-dom";

import IngresoList from "./IngresoList";
import DashBoard from "./DashBoard";
import GastosList from "./Gastos/GastoList";
import Dash from "./Dashboard/dash";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>
        <Dash/>
      </div>} />
      <Route path="/ingresos" element={<div>
        <IngresoList />
      </div>} />
      <Route path="/gastos" element={<div>
        <GastosList/>
      </div>} />
      <Route path="/dash" element={<div>
        <Dash/>
      </div>} />
    </Routes>
  );
};

export default AppRoutes;
