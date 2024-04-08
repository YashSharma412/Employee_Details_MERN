import BASE_URL from "./URL/BASE_URL";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage"; 
import DashboardPage from "./Pages/DashboardPage";
import SignUpPage from "./Pages/SignUpPage";
import Employees from "./Components/Employees";
import Departments from "./Components/Departments";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Employees />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
        </Route>
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
