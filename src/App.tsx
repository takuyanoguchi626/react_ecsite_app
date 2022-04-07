import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemList } from "./pages/Itemlist";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
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
