import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Toppage } from "./pages/Toppage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="toppage">TOP</Link>　|　
        <Link to="login">ログイン</Link>　|　<Link to="logout">ログアウト</Link>
        　|　
        <Routes>
          <Route path="/toppage" element={<Toppage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
