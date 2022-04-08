import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [loginData, setloginData] = useState({
    mailAddress: "",
    password: "",
  });

  const handleChange = (event) => {
    const newLoginData = { ...loginData };
    newLoginData[event.target.id] = event.target.value;
    setloginData(newLoginData);
    console.log(newLoginData);
    event.preventDefault();
  };

  useEffect(() => {
    const submit = async () => {
      await fetch(
        axios
          .post("http://153.127.48.168:8080/ecsite-api/user/login", {
            setloginData,
          })
          //   本来ならここにif文でres=successが入る
          .then((res) => {
            console.log("success");
            console.log(res.loginData);
            setloginData(loginData.mailAddress, loginData.password);
          })
          .catch((error) => {
            console.log(error);
          })
      );
      submit();
    };
  });

  return (
    <div>
      <div className="top-wrapper">
        <div className="container">
          <div className="row login-page">
            <div className="col s12 z-depth-6 card-panel"></div>
            <form onSubmit={(event) => setloginData(event)}>
              <h1>ログイン画面 </h1>
              <label htmlFor="mailAddress">メールアドレス:</label>
              <input
                type="text"
                className="mailAddress"
                id="mailAddress"
                onChange={(event) => handleChange(event)}
                value={setloginData.mailAddress}
              />
              <br></br>
              <label htmlFor="password">パスワード:</label>
              <input
                type="text"
                className="password"
                id="password"
                onChange={handleChange}
                value={setloginData.password}
              />
              <div className="row login-btn">
                <button
                  className="btn"
                  type="submit"
                  //   onClick={() => setloginData()}
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
