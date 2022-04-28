import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/orderFinished.css";

export const OrderFinished = () => {
  const navigate = useNavigate();

  return (
    <div className="completeOrder">
      <Typography variant="h3">決済が完了しました！</Typography>
      <Typography variant="h5">この度はご注文ありがとうございます。</Typography>

      <p>
        お支払い先は、お送りしたメールに記載してありますのでご確認ください。
      </p>
      <p>メールが届かない場合は「注文履歴」からご確認ください。</p>

      <Button
        className="btn"
        style={{ fontWeight: 700 }}
        onClick={() => navigate("/")}
      >
        トップ画面に戻る
      </Button>

      <Button
        className="btn"
        style={{ fontWeight: 700 }}
        onClick={() => navigate("/orderHistory")}
      >
        注文履歴
      </Button>
    </div>
  );
};
