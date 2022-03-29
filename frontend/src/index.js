import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import { CustomThemeProvider } from "./themes/CustomThemeProvider";
import axios from "axios";

axios.defaults.baseURL = "https://loc-backend-acm.herokuapp.com/"; //"http://localhost:8000";
ReactDOM.render(
  <React.Fragment>
    <CustomThemeProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);
