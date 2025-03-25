import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import IngresoList from "./IngresoList";
import DashBoard from "./DashBoard";
import GastosList from "./Gastos/GastoList";
import Dash from "./Dashboard/dash";
import LoginForm from "./Login/LoginForm";
import MyNavbar from './navbar';

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <MyNavbar />}
      <Routes>
        <Route path="/login" element={<div>
          <LoginForm/>
        </div>}/>
        <Route path="/" element={<div>
          <ProtegerRutas><Dash/></ProtegerRutas>
        </div>} />
        <Route path="/ingresos" element={<div>
         <ProtegerRutas> <IngresoList/> </ProtegerRutas> </div>}/>
        <Route path="/gastos" element={<div>
          <ProtegerRutas> <GastosList/></ProtegerRutas>
        </div>} />
        <Route path="/dash" element={<div>
          <ProtegerRutas> <Dash/></ProtegerRutas>
        </div>} />
      </Routes>
    </>
  );
};

const ProtegerRutas = ({children}) => {
  const token = localStorage.getItem('x-token');
  return token ? children : <Navigate to="/login" />;
}

export default AppRoutes;
