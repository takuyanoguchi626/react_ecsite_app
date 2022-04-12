import React, { useContext } from "react";
import { statusContext } from "./providers/statusContext";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StatusButton: React.VFC = () => {
  const auth = useContext(statusContext);
  console.log(auth);
  const handleSignOut = () => {
    auth?.setstatusCheck(false);
    axios.post("http://153.127.48.168:8080/ecsite-api/user/logout");
    console.log("ログアウトしてTOPページへ飛ぶ");
  };

  const handleSignIn = () => {
    auth?.setstatusCheck(true);
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
