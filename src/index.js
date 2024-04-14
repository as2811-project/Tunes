import * as React from "react";
import ReactDOM from "react-dom/client";
import "./theme.css";
import "./styles.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <div className="container">
      <Router>

        <App />

      </Router>
    </div>
  </React.StrictMode>,
  rootElement
);