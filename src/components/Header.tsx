import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { Login } from "../pages/Login";

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar
        position="static"
        style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
      >
        <Toolbar>
          <img
            src="../img_pizza/header_logo.png"
            alt="PIZZA"
            onClick={() => navigate("/")}
          ></img>
          <Typography variant="h6">らくらくPIZZA</Typography>

          <Button color="inherit" onClick={() => navigate("/content")}>
            ユーザー登録
          </Button>
          <Button color="inherit" onClick={() => navigate("/Login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("/ItemList")}>
            商品一覧
          </Button>
          <Button color="inherit" onClick={() => navigate("/OrderHistory")}>
            注文履歴
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
