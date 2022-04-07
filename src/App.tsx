import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="login">ログイン</Link>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
