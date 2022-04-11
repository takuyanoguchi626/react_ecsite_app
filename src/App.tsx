import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ItemDetail } from "./pages/ItemDetail";
import { ItemList } from "./pages/Itemlist";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/ItemList/" element={<ItemList></ItemList>}></Route>
          <Route
            path="/ItemDetail/:itemId"
            element={<ItemDetail></ItemDetail>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
