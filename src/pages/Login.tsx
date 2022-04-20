/* eslint-disable no-lone-blocks */
import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputLogin } from "../components/inputLogin";
import Button from "@material-ui/core/Button";
import { statusContext } from "../components/providers/statusContext";
import { Input } from "@material-ui/core";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../css/theme";

// useEffectを使ったログイン機能;
export const Login = () => {
  const navigate = useNavigate();

  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [mailAddress, setmailAddress] = useState("");
  const [password, setpassword] = useState("");
  const auth = useContext(statusContext);

  const submitLogin = async () => {
    console.log(mailAddress, password);
    setloginErrorMessage(() => "");
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      { mailAddress: mailAddress, password: password }
    );
    const status = response.data.status;
    console.dir("responce:" + JSON.stringify(response));
    if (status === "success") {
      console.log("成功");
      auth?.setstatusCheck(true);
      navigate("/ItemList");
    } else if (status === "error") {
      alert("メールアドレス、またはパスワードが間違っています");
    } else {
      alert("メールアドレス、パスワードを記入してください");
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="top-wrapper">
          <div className="container">
            <div className="row login-page">
              <div className="col s12 z-depth-6 card-panel"></div>
              <form>
                <h1>ログイン画面 </h1>
                <label htmlFor="mailAddress">
                  <EmailIcon />
                </label>
                <Input
                  type="text"
                  className="mailAddress"
                  id="mailAddress"
                  onChange={(event) => setmailAddress(() => event.target.value)}
                />
                <br></br>
                <label htmlFor="password">
                  <LockIcon />
                </label>
                <Input
                  type="text"
                  className="password"
                  id="password"
                  onChange={(event) => setpassword(() => event.target.value)}
                />
                <div className="row login-btn">
                  <Button className="btn" onClick={submitLogin}>
                    ログインする
                  </Button>
                  <Button
                    className="btn"
                    onClick={() => navigate("/registerUser")}
                  >
                    ユーザー登録へ戻る
                  </Button>
                </div>
              </form>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </ThemeProvider>
    </div>
  );
};

// export function Login() {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h3>ログイン画面</h3>
//       {/* 入力フォームのimport */}
//       {/* <InputLogin /> */}
//       {/* ログイン切り替えボタンのimport */}
//       <StatusButton />

//       <button className="btn" onClick={() => navigate("/content")}>
//         ユーザー登録
//       </button>

//       <div>
//         <Button color="inherit" onClick={() => navigate("/")}>
//           Topページに戻る
//         </Button>
//       </div>
//     </div>
//   );
// }
