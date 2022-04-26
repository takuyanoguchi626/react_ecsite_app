import React from "react";
import { Button } from "@material-ui/core";

export const QuestionForm = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <form>
        <span>お問い合わせ</span>
        <div>
          お名前
          <br />
          <input type="text" name="" id="" />
          <br />
          住所
          <br />
          <input type="text" name="" id="" />
          <br />
          ユーザーID
          <br />
          <input type="text" name="" id="" />
          <br />
          お問い合わせ内容
          <br />
          <textarea
            name="questionform"
            id="questionform"
            cols={30}
            rows={10}
          ></textarea>
          <br />
          <Button>送信</Button>
        </div>
      </form>
    </div>
  );
};
