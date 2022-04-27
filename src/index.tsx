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
import { OrderProvider } from "./components/providers/OrderProvider";
import { Login } from "./pages/Login";
import { Toppage } from "./pages/Toppage";
import { StatusProvider } from "./components/providers/statusContext";
import { userInfoProvider } from "./components/providers/loginInfoContext";
import { EditProvider } from "./components/providers/EditProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* ProviderのchildrenがAPPになる */}
    <EditProvider>
      <StatusProvider>
        <CartListProvider>
          <App />
        </CartListProvider>
      </StatusProvider>
    </EditProvider>
  </React.StrictMode>
);
