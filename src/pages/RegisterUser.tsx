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

export function RegisterInfo() {
  const navigate = useNavigate();
  const auth = useContext(statusContext);
  const {
    register,
    handleSubmit,
    formState: { errors },

    trigger,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // ユーザー情報格納先コンテキスト
  const userData = useContext(registerInfoContext);
  console.log(userData?.registerData);

  // ユーザー情報をAPIに送る
  const UserInfo = () => {
    // const UserInfo = async () => {
    //   const response = await axios.post(
    //     "http://153.127.48.168:8080/ecsite-api/user",
    //     {
    //       name: userData?.registerData.name,
    //       email: userData?.registerData.mailAddress,
    //       password: userData?.registerData.password,
    //       zipcode: userData?.registerData.zipcode,
    //       address: userData?.registerData.address,
    //       telephone: userData?.registerData.telephone,
    //     }
    //   );
    //   const status = response.data.status;
    //   console.dir("responce:" + JSON.stringify(response));
    //   if (status === "success") {
    //     console.log("成功");
    updateId();
    registerUserInfoToServer();
    navigate("/AfterRegister");
    //   } else if (response.data.errorCode === "E-01") {
    //     console.log("そのメールアドレスはすでに使われています");
    //     alert("そのメールアドレスはすでに使われています");
    //   } else {
    //     console.log("登録できませんでした");
    //     alert("登録できませんでした");
    //   }
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
        alert("登録できませんでした");
        return;
      }

      // // IDの初期値
      // await setDoc(doc(db, "userInfoId", "lastId"), {
      //   userId: 0,
      // });

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name", { minLength: 1 })}
                value={userData?.registerData.name}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    name: e.currentTarget.value,
                  });
                  trigger("name");
                }}
              />
              {errors.name && "名前を記入してください"}
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
              {errors.mailAddress && "メールアドレスは正しく記入してください"}
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
                {...register("telephone", { max: 11 })}
                value={userData?.registerData.telephone}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    telephone: e.currentTarget.value,
                  });
                  trigger("telephone");
                }}
              />
              {errors.telephone && "電話番号は11桁以内で記入してください"}
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
                  minLength: 5,
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
              {errors.password && "5文字以上のパスワードを記入してください"}
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
                  minLength: 5,
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
              {errors.zipcode && "郵便番号は5桁以上で記入してください"}
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
                  minLength: 3,
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
              {errors.address && "住所は都道府県から番地まで記入してください"}
            </div>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Button color="inherit" type="submit" onClick={() => UserInfo()}>
                送信
              </Button>
            </Grid>
          </form>
        </span>
      </Grid>
    </div>
  );
}
