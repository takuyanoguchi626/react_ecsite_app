import React, { useContext, useState } from "react";
// import { LoginInfoContext } from "./providers/loginInfoContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";

export const InputLogin = async () => {
  const navigate = useNavigate();
  const [mailAddress, setmailAddress] = useState("");
  const [password, setpassword] = useState("");
  //   const loginData = useContext(LoginInfoContext);

  const response = await axios.post(
    "http://153.127.48.168:8080/ecsite-api/user/login",
    { mailAddress: mailAddress, password: password }
  );
  const status = response.data.status;

  if (status === "success") {
    console.log("成功");
    navigate("/ItemList");
  } else if (status === "error") {
    console.log("1");
    alert("メールアドレス、パスワードが一致しません");
  } else {
    console.log("2");
    alert("メールアドレス、パスワードを記入してください");
  }

  return (
    <React.Fragment>
      <form>
        <h5>ログインフォーム</h5>
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
        <Button color="inherit" onClick={InputLogin}>
          ボタン
        </Button>
      </form>
    </React.Fragment>
  );
};
