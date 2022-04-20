import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Toppage } from "./pages/Toppage";
import { ItemList } from "./pages/Itemlist";
import { OrderComfirm } from "./pages/OrderComfirm";
import { OrderFinished } from "./pages/OrderFinished";
import { RegisterInfo } from "./pages/RegisterUser";
import { AfterRegister } from "./pages/AfterRegister";
// import { Content } from "./pages/Content";
import { CartList } from "./pages/CartList";
import { ItemDetail } from "./pages/ItemDetail";
// デザイン関連のインポート
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../src/css/theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Toppage />} />
            {/* <Route path="/content" element={<Content />} /> */}
            <Route path="/registerUser" element={<RegisterInfo />} />
            <Route path="/AfterRegister" element={<AfterRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/OrderComfirm"
              element={<OrderComfirm></OrderComfirm>}
            />
            <Route path="/ItemList" element={<ItemList />} />
            <Route path="/ItemDetail/:itemId" element={<ItemDetail />} />
            <Route path="/CartList/" element={<CartList />} />
            <Route
              path="/OrderFinished"
              element={<OrderFinished></OrderFinished>}
            />

            {/* <Route path="/CartList/" element={<CartList />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
