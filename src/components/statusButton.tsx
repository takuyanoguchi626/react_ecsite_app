import React, { useContext } from "react";
import { statusContext } from "./providers/statusContext";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../app/config";

export const StatusButton: React.VFC = () => {
  const auth = useContext(statusContext);
  const navigate = useNavigate();

  // SNS認証ログアウト
  const authrization = getAuth(app);
  const currentUser = authrization.currentUser;
  // ログアウトメソッド
  const logout = () => {
    signOut(authrization)
      .then(() => {
        // Sign-out successful.
        alert("ログアウトしました");
      })
      .catch((error) => {
        alert("ログアウトに失敗しました");
        // An error happened.
      });
  };
  const handleSignOut = () => {
    if (currentUser) {
      logout();
      auth?.setstatusCheck(false);
      navigate("/");
    }
    console.log("ログアウトしてTOPページへ飛ぶ");
  };

  const handleSignIn = () => {
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
