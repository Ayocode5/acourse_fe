import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RouterApp from "./routers/RouterApp";

import store from "./config/redux/store";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterApp />
    </Provider>
  </React.StrictMode>,
);
