import React from "react";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Toppage } from "./pages/Toppage";
import { ItemList } from "./pages/Itemlist";
import { OrderComfirm } from "./pages/OrderComfirm";
import { OrderFinished } from "./pages/OrderFinished";

import { RegisterInfo } from "../src/components/Register/RegisterInfo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Toppage />} />

          <Route path="/registerInfo" element={<RegisterInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<ItemList />}></Route>
          <Route path="/OrderComfirm" element={<OrderComfirm></OrderComfirm>} />
          <Route path="/ItemList" element={<ItemList />} />
          <Route
            path="/OrderFinished"
            element={<OrderFinished></OrderFinished>}
          />

          {/* <Route path="/CartList/" element={<CartList />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
