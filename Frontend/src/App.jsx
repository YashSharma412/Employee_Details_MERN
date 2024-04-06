import BASE_URL from "./URL/BASE_URL";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import SignUpPage from "./Pages/SignUpPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
