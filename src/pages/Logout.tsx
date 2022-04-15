import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const submitLogout = async () => {
      const response = await axios.post(
        "http://153.127.48.168:8080/ecsite-api/user/logout"
      );
      console.dir("response:" + JSON.stringify(response));
    };
  }, []);

  return (
    <div>
      <h2>また買いに来てね</h2>

      <div>
        <Button color="inherit" onClick={() => navigate("/toppage")}>
          TOPページに戻る
        </Button>
      </div>
    </div>
  );
}
