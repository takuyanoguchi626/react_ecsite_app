/* eslint-disable no-lone-blocks */
import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputLogin } from "../components/inputLogin";
import Button from "@material-ui/core/Button";
import { statusContext } from "../components/providers/statusContext";
import { app } from "../app/config";
import "firebase/auth";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/auth";
import { TwitterAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { Box, Grid, Input, Typography } from "@material-ui/core";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "../css/Login.css";

// useEffectを使ったログイン機能;
export const Login = () => {
  const navigate = useNavigate();

  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [mailAddress, setmailAddress] = useState("");
  const [password, setpassword] = useState("");
  const auth = useContext(statusContext);

  // firebaseへ送信
  // firestore認証
  const authenication = getAuth();

  const submitLogin = async () => {
    setloginErrorMessage(() => "");

    signInWithEmailAndPassword(authenication, mailAddress, password)
      .then((result) => {
        // Signed in
        auth?.setstatusCheck(true);
        navigate("/ItemList");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          setloginErrorMessage("ユーザーが登録されていません");
          console.log(errorMessage);
        } else if (
          errorMessage === "Firebase: Error (auth/invalid-email)." ||
          "Firebase: Error (auth/invalid-password)."
        ) {
          setloginErrorMessage(
            "メールアドレスまたはパスワードが間違っています。"
          );
        } else if (mailAddress === "" && password !== "") {
          setloginErrorMessage("メールアドレスを入力してください");
        } else if (password === "" && mailAddress !== "") {
          setloginErrorMessage("パスワードを入力してください");
        } else {
          setloginErrorMessage(
            "メールアドレスまたはパスワードを入力してください"
          );
        }
      });
  };

  // firebase認証
  const authrization = getAuth(app);
  // ツイッター認証
  const providerTwitter = new TwitterAuthProvider();

  /**
   * ツイッターでのログイン
   */
  const loginWithTwitter = () => {
    signInWithPopup(authrization, providerTwitter)
      .then((result) => {
        if (result.operationType === "signIn") {
          console.log(result);
          console.log("twitterログイン成功");
          auth?.setstatusCheck(true);
          navigate("/ItemList");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(error);
        alert(
          `"Twitterでログインできませんでした。"+"エラーメッセージ："+${errorMessage}`
        );
      });
  };

  // facebook認証
  const providerFacebook = new FacebookAuthProvider();

  const loginWithFacebook = () => {
    signInWithPopup(authrization, providerFacebook)
      .then((result) => {
        if (result.operationType === "signIn") {
          console.log("facebookログイン成功");
          auth?.setstatusCheck(true);
          navigate("/ItemList");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(error);
        alert(
          `"Twitterでログインできませんでした。"+"エラーメッセージ："+${errorMessage}`
        );
      });
  };

  return (
    <div>
      <div className="top-wrapper">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid container justifyContent="center" alignItems="flex-start">
            <h1>ログイン画面</h1>
          </Grid>

          <span className="container">
            <div className="loginParameters" style={{ display: "flex" }}>
              <form>
                <div style={{ fontWeight: 700, padding: "30px" }}>
                  ログインする
                </div>
                <div id="loginerrorMessage">{loginErrorMessage}</div>
                <label htmlFor="mailAddress">
                  <EmailIcon />
                </label>
                <Input
                  type="text"
                  className="mailAddress"
                  id="mailAddress"
                  onChange={(event) => setmailAddress(() => event.target.value)}
                />
                <br></br>
                <label htmlFor="password">
                  <LockIcon />
                </label>
                <Input
                  type="text"
                  className="password"
                  id="password"
                  onChange={(event) => setpassword(() => event.target.value)}
                />
                <div className="row login-btn">
                  <Button
                    className="btn"
                    style={{ fontWeight: 700 }}
                    onClick={submitLogin}
                  >
                    ログインする
                  </Button>
                  <Button
                    className="btn"
                    style={{ fontWeight: 700 }}
                    onClick={() => navigate("/registerUser")}
                  >
                    まずはユーザー登録
                  </Button>
                </div>
              </form>
              <br />
              <div className="SNSLogin">
                <div style={{ fontWeight: 700, padding: "30px" }}>
                  SNSアカウントでログインする
                </div>

                <Button
                  className="btn"
                  style={{ fontWeight: 700 }}
                  type="button"
                  onClick={loginWithTwitter}
                >
                  <img
                    src="\img\twitter_login.png"
                    alt="twitter"
                    style={{ width: "30px", margin: "10px" }}
                  />
                  Twitterでログインする
                </Button>
                <br />
                <Button
                  className="btn"
                  style={{ fontWeight: 700 }}
                  type="button"
                  onClick={loginWithFacebook}
                >
                  <img
                    src="\img\facebook_login.png"
                    alt="twitter"
                    style={{ width: "30px", margin: "10px" }}
                  />
                  Facebookでログインする
                </Button>
              </div>
            </div>
          </span>
        </Grid>
      </div>{" "}
    </div>
  );
};
