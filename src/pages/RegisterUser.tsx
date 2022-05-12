import { Button, Grid, Input, TextField } from "@material-ui/core";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { statusContext } from "../components/providers/statusContext";
import { User } from "../types/User";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../app/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { registerInfoContext } from "../components/Register/RegisterInfo";
import "../css/registerUser.css";

export function RegisterInfo() {
  const navigate = useNavigate();
  const auth = useContext(statusContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    // form欄の外をクリックするとトリガーが発動するモードに設定する
    mode: "onBlur",
  });

  // ユーザー情報格納先コンテキスト
  const userData = useContext(registerInfoContext);

  // ユーザー情報をAPIに送る
  const UserInfo = async () => {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user",
      {
        name: userData?.registerData.name,
        email: userData?.registerData.mailAddress,
        password: userData?.registerData.password,
        zipcode: userData?.registerData.zipcode,
        address: userData?.registerData.address,
        telephone: userData?.registerData.telephone,
      }
    );
    const status = response.data.status;
    console.dir("responce:" + JSON.stringify(response));
    if (status === "success") {
      console.log("成功");
      updateId();
      registerUserInfoToServer();
      navigate("/AfterRegister");
    } else if (response.data.errorCode === "E-01") {
      console.log("そのメールアドレスはすでに使われています");
      alert("そのメールアドレスはすでに使われています");
    } else {
      console.log("登録できませんでした");
      alert("登録できませんでした");
    }
  };
  // ユーザー情報をfirebaseへ送信

  // firestore認証
  const db = getFirestore(app);
  const docRef = collection(db, "userInformation");
  const authenication = getAuth();

  const mailAddress = userData?.registerData.mailAddress;
  const password = userData?.registerData.password;

  // IDを更新する
  const updateId = async () => {
    const newestId = await getDoc(doc(db, "userInfoId", "lastId"));
    await updateDoc(doc(db, "userInfoId", "lastId"), {
      userId: newestId.data()?.userId + 1,
    });
  };

  //   ユーザー情報をfirebaseに送る
  const registerUserInfoToServer = async () => {
    try {
      if (mailAddress !== undefined && password !== undefined) {
        // firebaseへ登録
        createUserWithEmailAndPassword(authenication, mailAddress, password);
      } else {
        console.log("error");
        return;
      }

      // IDを取得する
      const newId = await getDoc(doc(db, "userInfoId", "lastId"));

      const sendUserInfo = await setDoc(
        doc(db, "userInformation", String(newId.data()?.userId + 1)),
        {
          id: newId.data()?.userId + 1,
          name: userData?.registerData.name,
          email: userData?.registerData.mailAddress,
          password: userData?.registerData.password,
          zipcode: userData?.registerData.zipcode,
          address: userData?.registerData.address,
          telephone: userData?.registerData.telephone,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid container justifyContent="center" alignItems="flex-start">
          <h1>会員登録フォーム</h1>
        </Grid>
        <span className="containers">
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <form>
            <div className="form-group">
              <label className="col-form-label">
                <EmojiPeopleIcon />
              </label>

              <TextField
                className="textField"
                label="名前"
                variant="outlined"
                required
                type="text"
                {...register("name", {
                  required: "名前を入力してください",
                })}
                value={userData?.registerData.name}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    name: e.currentTarget.value,
                  });
                  trigger("name");
                }}
              />
              <div id="registerUserErrMsg">{errors.name?.message}</div>
            </div>
            <br />

            <div className="form-group">
              <label className="col-form-label">
                <EmailIcon />
              </label>

              <TextField
                className="textField"
                label="メールアドレス"
                variant="outlined"
                type="text"
                {...register("mailAddress", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "正しいメールアドレスの形式で入力してください。",
                  },
                })}
                value={userData?.registerData.mailAddress}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    mailAddress: e.currentTarget.value,
                  });
                  trigger("mailAddress");
                }}
              />
              <div id="registerUserErrMsg">{errors.mailAddress?.message}</div>
            </div>
            <br />

            <div className="form-group">
              <label className="col-form-label">
                <PhoneIcon />
              </label>

              <TextField
                className="textField"
                label="電話番号"
                variant="outlined"
                type="text"
                {...register("telephone", {
                  minLength: {
                    value: 10,
                    message: "電話番号は10桁以上で入力してください。",
                  },
                  maxLength: {
                    value: 11,
                    message: "電話番号は11桁以内で入力してください。",
                  },
                  required: "電話番号を入力してください",
                })}
                value={userData?.registerData.telephone}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    telephone: e.currentTarget.value,
                  });
                  trigger("telephone");
                }}
              />
              <div id="registerUserErrMsg">{errors.telephone?.message}</div>
            </div>
            <br />

            <div className="form-group">
              <label className="col-form-label">
                <LockIcon />
              </label>

              <TextField
                className="textField"
                label="パスワード"
                variant="outlined"
                type="text"
                {...register("password", {
                  required: "パスワードを入力してください",
                  minLength: {
                    value: 5,
                    message: "パスワードは5桁以上で入力してください",
                  },
                })}
                value={userData?.registerData.password}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    password: e.currentTarget.value,
                  });
                  trigger("password");
                }}
              />
              <div id="registerUserErrMsg">{errors.password?.message}</div>
            </div>
            <br />

            <div className="form-group">
              <label className="col-form-label">
                <img src="../zipcodeIcon.png" width="25" alt="" />
              </label>
              <TextField
                className="textField"
                label="郵便番号"
                variant="outlined"
                type="text"
                {...register("zipcode", {
                  required: "郵便番号を入力してください",
                  minLength: {
                    value: 5,
                    message: "郵便番号は5桁以上で入力してください",
                  },
                })}
                value={userData?.registerData.zipcode}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    zipcode: e.currentTarget.value,
                  });
                  trigger("zipcode");
                }}
              />
              <div id="registerUserErrMsg">{errors.zipcode?.message}</div>
            </div>
            <br />

            <div className="form-group">
              <label className="col-form-label">
                <HomeIcon />
              </label>
              <TextField
                className="textField"
                label="住所"
                variant="outlined"
                type="text"
                {...register("address", {
                  required: "住所を入力してください",
                  minLength: {
                    value: 3,
                    message: "住所を正しく入力してください",
                  },
                })}
                value={userData?.registerData.address}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    address: e.currentTarget.value,
                  });
                  trigger("address");
                }}
              />
              <div id="registerUserErrMsg">{errors.address?.message}</div>
            </div>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Button color="inherit" type="submit" onClick={() => UserInfo()}>
                送信
              </Button>
            </Grid>
          </form>
        </span>
      </Grid>
      <br />
    </div>
  );
}
