import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderComfirm } from "./pages/OrderComfirm";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={OrderComfirm}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
