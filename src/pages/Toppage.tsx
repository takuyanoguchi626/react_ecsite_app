import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const Toppage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>THIS IS TOPPAGE</h1>
      <h2>Enjoy our Delicious Pizza</h2>
      背景を画像にしたりなんやらかんやらする
      <div>
        <Button
          className="btn"
          style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
          variant="contained"
          onClick={() => navigate("/login")}
        >
          ログインしてからオーダーを開始する
        </Button>
        &nbsp; &nbsp;
        <Button
          className="btn"
          style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
          variant="contained"
          onClick={() => navigate("/content")}
        >
          会員登録する
        </Button>
      </div>
      <div></div>
    </div>
  );
};
