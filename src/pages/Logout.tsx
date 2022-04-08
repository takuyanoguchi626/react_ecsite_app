import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await axios.post("http://153.127.48.168:8080/ecsite-api/user/logout");
      console.log("ログアウト成功");
      navigate("/toppage");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <h1>ログアウトしました</h1>
      <h2>また買いに来てね</h2>
      {error}
      <div>
        <button className="btn" onClick={() => navigate("/toppage")}>
          TOPページに戻る
        </button>
      </div>
    </div>
  );
};
