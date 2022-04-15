import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { statusContext } from "../components/providers/statusContext";

export const AfterRegister = () => {
  const navigate = useNavigate();
  const auth = useContext(statusContext);

  return (
    <div>
      <h1>会員登録ありがとうございます！</h1>
      <h3>このままログインしお買い物を続けますか？</h3>
      <Button className="btn" onClick={() => navigate("/itemList")}>
        はい
      </Button>
      <Button
        className="btn"
        onClick={() => {
          navigate("/");
          auth?.setstatusCheck(false);
        }}
      >
        いいえ
      </Button>
    </div>
  );
};
