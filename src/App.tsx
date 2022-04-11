import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderComfirm } from "./pages/OrderComfirm";
import { ItemList } from "./pages/Itemlist";
import { OrderFinished } from "./pages/OrderFinished";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ItemList />}></Route>
          <Route
            path="/OrderComfirm"
            element={<OrderComfirm></OrderComfirm>}
          ></Route>
          <Route path="/ItemList" element={<ItemList />}></Route>
          <Route
            path="/OrderFinished"
            element={<OrderFinished></OrderFinished>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
