import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Toppage } from "./pages/Toppage";
import { OrderComfirm } from "./pages/OrderComfirm";
import { ItemList } from "./pages/Itemlist";
import { OrderFinished } from "./pages/OrderFinished";
// import {CartList} from "./pages/ItemDetail"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Toppage />} />
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
          {/* <Route path="/CartList/" element={<CartList></CartList>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
