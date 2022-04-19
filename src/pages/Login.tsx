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
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";

// useEffectを使ったログイン機能;
export const Login = () => {
  const navigate = useNavigate();

  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [mailAddress, setmailAddress] = useState("");
  const [password, setpassword] = useState("");
  const auth = useContext(statusContext);

  const submitLogin = async () => {
    console.log(mailAddress, password);
    setloginErrorMessage(() => "");
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      { mailAddress: mailAddress, password: password }
    );
    const status = response.data.status;
    console.dir("responce:" + JSON.stringify(response));
    if (status === "success") {
      console.log("成功");
      auth?.setstatusCheck(true);
      navigate("/ItemList");
    } else if (status === "error") {
      alert("メールアドレス、またはパスワードが間違っています");
    } else {
      alert("メールアドレス、パスワードを記入してください");
    }
  };

  const authrization = getAuth(app);
  const providerTwitter = new TwitterAuthProvider();

  const loginWithTwitter = () => {
    getRedirectResult(authrization);

    // signInWithEmailAndPassword(authrization, "test@email.com", "testForNow");
    // signInWithRedirect(authrization, providerTwitter);

    signInWithPopup(authrization, providerTwitter)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.

        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token =
          "AAAAAAAAAAAAAAAAAAAAAHKVbgEAAAAAJJpqFfpODHZ2wns61kM2A0xhwTU%3Dub5sjpNFxKgb8zrU32ceZI7bo8ZB6j70Tz55vdc0EBX7Q9VaR0";
        const secret = "KnRmItqime2PDuvsPmSRCFupa0HchU2pfYzp9QroI8cT1zIgwy";

        // The signed-in user info.
        const user = result.user;
        // ...

        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...

        console.log(error);
      });
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
                <Button className="btn" onClick={submitLogin}>
                  ログインする
                </Button>
                <Button
                  className="btn"
                  onClick={() => navigate("/registerUser")}
                >
                  ユーザー登録へ戻る
                </Button>
                <button type="button" onClick={loginWithTwitter}>
                  Twitterでログインする
                </button>
              </div>
            </form>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

// export function Login() {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h3>ログイン画面</h3>
//       {/* 入力フォームのimport */}
//       {/* <InputLogin /> */}
//       {/* ログイン切り替えボタンのimport */}
//       <StatusButton />

//       <button className="btn" onClick={() => navigate("/content")}>
//         ユーザー登録
//       </button>

//       <div>
//         <Button color="inherit" onClick={() => navigate("/")}>
//           Topページに戻る
//         </Button>
//       </div>
//     </div>
//   );
// }
