import "./index.css";
import App from "./App";
import React from "react";
import "antd/dist/antd.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

