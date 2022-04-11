import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { OrderComfirm } from "./pages/OrderComfirm";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" element={OrderComfirm}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
