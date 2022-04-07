import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import OrderComFirm from "./pages/OrderComFirm";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={OrderComFirm}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
