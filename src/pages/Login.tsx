/* eslint-disable no-lone-blocks */
import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// useEffectを使ったログイン機能;
export const Login = () => {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    mailAddress: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newLoginData = { ...loginData };
    // newLoginData[event.target.value] = [event.target.value];
    setloginData(newLoginData);
    event.preventDefault();
  };

  useEffect(() => {
    const submit = async () => {
      const response = await axios
        .post("http://153.127.48.168:8080/ecsite-api/user/login", {
          setloginData,
        })
        .then((response) => {
          console.dir("response" + JSON.stringify(response));
          if (JSON.stringify(response.status) === "success") {
            console.log("成功");
            setloginData(loginData);
            return;
          } else if (JSON.stringify(response.status) === "error") {
            console.log("不一致");
            alert("メールアドレス、パスワードが一致しません");
          } else if (JSON.stringify(response.status) === "") {
            console.log("未記入");
            alert("メールアドレス、パスワードを記入してください");
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  });

  return (
    <div>
      <div className="top-wrapper">
        <div className="container">
          <div className="row login-page">
            <div className="col s12 z-depth-6 card-panel"></div>
            <form onSubmit={(event) => setloginData(loginData)}>
              <h1>ログイン画面 </h1>
              <label htmlFor="mailAddress">メールアドレス:</label>
              <input
                type="text"
                className="mailAddress"
                id="mailAddress"
                onChange={(event) => handleChange(event)}
              />
              <br></br>
              <label htmlFor="password">パスワード:</label>
              <input
                type="text"
                className="password"
                id="password"
                onChange={handleChange}
              />
              <div className="row login-btn">
                <button
                  className="btn"
                  type="submit"
                  onClick={() => navigate("/toppage")}
                >
                  ボタン
                </button>

                <button
                  className="btn"
                  onClick={() => navigate("/registerUser")}
                >
                  ユーザー登録
                </button>
              </div>
            </form>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
