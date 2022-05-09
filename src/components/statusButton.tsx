import React, { useContext } from "react";
import { statusContext } from "./providers/statusContext";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../app/config";
import { userContext } from "../components/providers/UserInfoContext";

export const StatusButton: React.VFC = () => {
  //ユーザーが入力した情報
  const userStatus = useContext(userContext);
  // ユーザー情報
  const auth = useContext(statusContext);
  // ナビゲート機能
  const navigate = useNavigate();

  // firebase認証機能の認証
  const authrization = getAuth(app);
  // 現在ログインしているユーザー
  const currentUser = authrization.currentUser;
  // ログイン状態確認
  const loginStatus = authrization.onAuthStateChanged((user) => {
    console.log(user);
  });
  // ログアウトメソッド
  const logout = () => {
    signOut(authrization)
      .then(() => {
        // Sign-out successful.
        alert("ログアウトしました");
        auth?.setstatusCheck(false);
        loginStatus();
      })
      .catch((error) => {
        alert("ログアウトに失敗しました");
        // An error happened.
      });
  };
  const handleSignOut = () => {
    if (loginStatus !== null) {
      logout();
      if (auth?.statusCheck === false) {
        // 入力欄を更新
        userStatus?.setUserInfo({
          ...userStatus?.userInfo,
          name: "",
          mailAddress: "",
          zipCode: 0,
          address: "",
          telephone: 0,
        });
      }
      auth?.setstatusCheck(false);
      navigate("/");
    }
    console.log("ログアウトしてTOPページへ飛ぶ");
  };

  const handleSignIn = () => {
    loginStatus();
    navigate("/login");
    console.log("ログイン画面へいく");
  };

  return (
    <React.Fragment>
      {auth?.statusCheck ? (
        <Button color="inherit" onClick={handleSignOut}>
          ログアウト
        </Button>
      ) : (
        <Button
          color="inherit"
          onClick={handleSignIn}
          onChange={() => {
            handleSignIn();
          }}
        >
          ログイン
        </Button>
      )}
    </React.Fragment>
  );
};
