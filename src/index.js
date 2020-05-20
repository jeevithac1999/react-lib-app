import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./store/UserProvider/UserProvider"
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <Router>
      <App />
    </Router>
    </UserProvider>
  </React.StrictMode>,
  rootElement
);
