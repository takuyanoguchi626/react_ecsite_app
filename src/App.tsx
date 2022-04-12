import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Toppage } from "./pages/Toppage";
import { ItemList } from "./pages/Itemlist";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/toppage" element={<Toppage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<ItemList />}></Route>
          {/* <Route path="/ItemList" element={<ItemList />}></Route> */}
          {/* <Route
            path="/ItemDetail/:itemId"
            element={<ItemDetail></ItemDetail>}
          ></Route>
          <Route path="/CartList/" element={<CartList></CartList>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
