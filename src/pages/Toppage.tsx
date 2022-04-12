import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { StatusButton } from "../components/logoutButton";

export const Toppage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>THIS IS TOPPAGE</h1>
      <h2>Enjoy our Delicious Pizza</h2>
      背景を画像にしたりなんやらかんやらする
      <div>
        <StatusButton />
        <Button
          className="btn"
          style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
          variant="contained"
          onClick={() => navigate("/login")}
        >
          ログイン
        </Button>
        &nbsp; &nbsp;
        <Button
          className="btn"
          style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
          variant="contained"
          onClick={() => navigate("/registerUser")}
        >
          会員登録ボタン
        </Button>
      </div>
      <div></div>
    </div>
  );
};
