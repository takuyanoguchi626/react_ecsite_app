import React, { useContext } from "react";
import { statusContext } from "./providers/statusContext";

export const StatusButton: React.VFC = () => {
  const auth = useContext(statusContext);
  console.log("ステータス");

  const handleSignOut = () => {
    auth?.setstatusCheck(false);
  };

  const handleSignIn = () => {
    auth?.setstatusCheck(true);
  };

  return (
    <React.Fragment>
      {auth?.statusCheck ? (
        <button onClick={handleSignOut}>ログアウト</button>
      ) : (
        <button onClick={handleSignIn}>ログイン</button>
      )}
    </React.Fragment>
  );
};
