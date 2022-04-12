import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusButton } from "../components/logoutButton";

export function Logout() {
  // setError("");
  // try {
  //   await axios.post("http://153.127.48.168:8080/ecsite-api/user/logout");
  //   console.log("ログアウト成功");
  //   navigate("/toppage");
  // } catch {
  //   setError("Failed to log out");
  // }
  // }

  return (
    <div>
      <h1>ログアウトしました</h1>
      <h2>また買いに来てね</h2>

      <div>
        <StatusButton />
        {/* <button className="btn"> */}
        {/* onClick={sumbitLogout}> */}
        {/* TOPページに戻る */}
        {/* </button> */}

        <button className="btn" onClick={() => navigate("/")}>
          TOPページに戻る
        </button>
      </div>
    </div>
  );
}
