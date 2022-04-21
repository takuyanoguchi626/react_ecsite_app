import React, { useContext } from "react";
import { statusContext } from "./providers/statusContext";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StatusButton: React.VFC = () => {
  const auth = useContext(statusContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/logout"
    );
    console.dir("response:" + JSON.stringify(response));
    auth?.setstatusCheck(false);
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
