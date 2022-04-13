// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartListProvider } from "./components/providers/CartListProvider";
import { Login } from "./pages/Login";
import { Toppage } from "./pages/Toppage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* ProviderのchildrenがAPPになる */}
    <CartListProvider>
      <App />
      {/* 1個だけじゃないとダメ */}
    </CartListProvider>
  </React.StrictMode>
);
