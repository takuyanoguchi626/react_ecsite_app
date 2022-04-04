import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemDetail } from "./pages/ItemDetail";
import { ItemList } from "./pages/ItemList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList></ItemList>}></Route>
        <Route path="/ItemList" element={<ItemList></ItemList>}></Route>
        <Route path="/ItemDetail" element={<ItemDetail></ItemDetail>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
