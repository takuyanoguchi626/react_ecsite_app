import { useState } from "react";
import React from "react";
import { UserInfo } from "../types/UserInfo";
import { Link } from "react-router-dom";

export const Login = () => {
  const [mailAddress, setmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loginInfo, setloginInfo] = useState(false);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "mailAddress":
        setmailAddress(event.target.value);
        break;
      case "pass":
        setPassword(event.target.value);
        break;
      default:
        console.log("key not found");
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
              <label htmlFor="mailAddress">メールアドレス</label>
              <input
                type="text"
                className="mailAddress"
                id="mailAddress"
                onChange={handleChange}
              />
              <br></br>
              <label htmlFor="password">パスワード</label>
              <input
                type="text"
                className="password"
                id="password"
                onChange={handleChange}
              />
              <div className="row login-btn">
                <button
                  className="btn"
                  type="button"
                  onClick={() => setloginInfo(true)}
                >
                  ログイン
                </button>
                <Link to="registerUser">ユーザー登録</Link>
              </div>
            </form>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
