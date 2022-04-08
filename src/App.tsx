import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Toppage } from "./pages/Toppage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="login">ログイン</Link>
        <Routes>
          <Route path="/toppage" element={<Toppage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
