import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Toppage } from "./pages/Toppage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Toppage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
