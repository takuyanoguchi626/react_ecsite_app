import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { app } from "../app/config";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";

export const QuestionForm = () => {
  // firestore認証
  const db = getFirestore(app);
  const docRef = collection(db, "questionForm");

  //   ユーザー情報
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  //   ユーザー情報をfirebaseに送る
  const sendUserInfo = async () => {
    try {
      await addDoc(docRef, {
        name: userName,
        address: userAddress,
        userId: userId,
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(db);
  console.log(collection(db, "questionForm"));

  return (
    <div style={{ textAlign: "center" }}>
      <form>
        <span>お問い合わせ</span>
        <div>
          お名前
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          住所
          <br />
          <input
            type="text"
            name="address"
            id="address"
            onChange={(e) => setUserAddress(e.target.value)}
          />
          <br />
          ユーザーID
          <br />
          <input
            type="text"
            name="userId"
            id="userId"
            onChange={(e) => setUserId(e.target.value)}
          />
          <br />
          お問い合わせ内容
          <br />
          <textarea
            name="questionform"
            id="questionform"
            cols={30}
            rows={10}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <Button onClick={sendUserInfo}>送信</Button>
        </div>
      </form>
    </div>
  );
};
