import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./Context/User/UserProvider";
import UtillsProvider from "./Context/Utills/UtillsProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <UtillsProvider>
      <Router>
        <App />
      </Router>
    </UtillsProvider>
  </UserProvider>
);
