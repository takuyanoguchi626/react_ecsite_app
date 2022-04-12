import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Toppage } from "./pages/Toppage";
import { ItemList } from "./pages/Itemlist";

import { OrderComfirm } from "./pages/OrderComfirm";

import { OrderFinished } from "./pages/OrderFinished";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/toppage" element={<Toppage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
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
