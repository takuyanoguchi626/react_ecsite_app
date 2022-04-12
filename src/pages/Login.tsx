/* eslint-disable no-lone-blocks */
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../types/User";

// useEffectを使ったログイン機能;
export const Login = () => {
  const navigate = useNavigate();

  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [mailAddress, setmailAddress] = useState("");
  const [password, setpassword] = useState("");

  const submitLogin = async () => {
    setloginErrorMessage(() => "");
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      { mailAddress: mailAddress, password: password }
    );
    const status = response.data.status;
    console.log(mailAddress + password);

    if (status === "success") {
      console.log("成功");
      navigate("/ItemList");
    } else if (status === "error") {
      console.log("1");
      alert("メールアドレス、パスワードが一致しません");
    } else {
      console.log("2");
      alert("メールアドレス、パスワードを記入してください");
    }
  };

  return (
    <div>
      <div className="top-wrapper">
        <div className="container">
          <div className="row login-page">
            <div className="col s12 z-depth-6 card-panel"></div>
            <form>
              <h1>ログイン画面 </h1>
              <label htmlFor="mailAddress">メールアドレス:</label>
              <input
                type="text"
                className="mailAddress"
                id="mailAddress"
                onChange={(event) => setmailAddress(() => event.target.value)}
              />
              <br></br>
              <label htmlFor="password">パスワード:</label>
              <input
                type="text"
                className="password"
                id="password"
                onChange={(event) => setpassword(() => event.target.value)}
              />
              <div className="row login-btn">
                <button className="btn" type="button" onClick={submitLogin}>
                  ログインする
                </button>

                <button className="btn" onClick={() => navigate("/")}>
                  ユーザー登録へ戻る
                </button>
              </div>
            </form>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
