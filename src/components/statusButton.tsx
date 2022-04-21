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
  const logoutSNS = () => {
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
  const handleSignOut = async () => {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/logout"
    );
    console.dir("response:" + JSON.stringify(response));
    auth?.setstatusCheck(false);
    // SNSでログインしたユーザーをログアウト
    if (currentUser) {
      logoutSNS();
    }
    console.log("ログアウトしてTOPページへ飛ぶ");
  };

  const handleSignIn = () => {
    auth?.setstatusCheck(true);
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
