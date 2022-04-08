import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Toppage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>THIS IS TOPPAGE</h1>
      <h2>Enjoy our Delicious Pizza</h2>
      <div>
        <button className="btn" onClick={() => navigate("/login")}>
          ログイン
        </button>
      </div>
      <div>
        <button className="btn" onClick={() => navigate("/registerUser")}>
          会員登録ボタン
        </button>
      </div>
    </div>
  );
};
