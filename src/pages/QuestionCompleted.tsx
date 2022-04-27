import React from "react";
import "../css/questionCompleted.css";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const QuestionCompleted = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="questionResult">
        <div className="backimage">
          <div className="message">
            <span>お問い合わせありがとうございます！</span>
            <br />
            <span>回答まで少々お待ちください。</span>
            <br />
            <img
              src="img/pizza_delivery.png"
              alt="pizza"
              style={{ width: "300px", height: "300px" }}
            />
            <br />
            <Button
              style={{ fontSize: "30px" }}
              onClick={() => {
                navigate("/");
              }}
            >
              TOPへ戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
