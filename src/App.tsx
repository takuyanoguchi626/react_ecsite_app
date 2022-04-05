import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartList } from "./pages/CartList";
import { ItemDetail } from "./pages/ItemDetail";
import { ItemList } from "./pages/ItemList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList></ItemList>}></Route>
        <Route path="/ItemList" element={<ItemList></ItemList>}></Route>
        <Route
          path="/ItemDetail/:itemId"
          element={<ItemDetail></ItemDetail>}
        ></Route>
        <Route path="/CartList/" element={<CartList></CartList>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
