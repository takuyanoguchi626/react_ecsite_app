import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderComfirm } from "./pages/OrderComfirm";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrderComfirm></OrderComfirm>}></Route>
          <Route
            path="/OrderComfirm"
            element={<OrderComfirm></OrderComfirm>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
