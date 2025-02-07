import React from "react";

import initializeAxios from "apis/axios";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// i18n should load before App initialization
// eslint-disable-next-line import/order, no-unused-vars
import "components/commons/i18n";
import queryClient from "utils/queryClient";

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

initializeAxios();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
