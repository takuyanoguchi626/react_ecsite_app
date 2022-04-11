import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ItemDetail } from "./pages/ItemDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/ItemList/" element={<ItemList></ItemList>} */}
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
