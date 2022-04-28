import {
  Button,
  Grid,
  Input,
  InputAdornment,
  TextField,
} from "@material-ui/core";
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
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // reset();
  };

  // ユーザー情報格納先コンテキスト
  const userData = useContext(registerInfoContext);
  console.log(userData?.registerData);

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

              <Input
                required
                type="text"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", { required: "Name is Required" })}
                value={userData?.registerData.name}
                onChange={(e) => {
                  userData?.setregisterData({
                    ...userData?.registerData,
                    name: e.currentTarget.value,
                  });
                  trigger("name");
                  console.log(e.currentTarget.value);
                }}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <EmailIcon />
              </label>

              <Input
                type="text"
                className={`form-control ${errors.mailAddress && "invalid"}`}
                {...register("mailAddress", {
                  required: "Email is Required",
                  // pattern: {
                  //   message: "Invalid email address",
                  // },
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
              {errors.mailAddress && (
                <small className="text-danger">
                  {errors.mailAddress.message}
                </small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <PhoneIcon />
              </label>

              <Input
                type="text"
                className={`form-control ${errors.telephone && "invalid"}`}
                {...register("telephone", {
                  required: "Phone is Required",
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
              {errors.telephone && (
                <small className="text-danger">
                  {errors.telephone.message}
                </small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <LockIcon />
              </label>
              <Input
                type="text"
                {...(register(`form-control ${errors.password && "invalid"}`),
                {
                  ...register("password", {
                    required: {
                      value: true,
                      message: "パスワードを入力してください。",
                    },
                    minLength: {
                      value: 6,
                      message: "パスワードは6文字以上で入力してください",
                    },
                  }),
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
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <img src="../zipcodeIcon.png" width="30" alt="" />
              </label>
              <Input
                type="text"
                className={`form-control ${errors.zipcode && "invalid"}`}
                {...register("zipcode", {
                  required: "zipcode is Required",
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
              {errors.zipcode && (
                <small className="text-danger">{errors.zipcode.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">
                <HomeIcon />
              </label>
              <Input
                type="text"
                className={`form-control ${errors.address && "invalid"}`}
                {...register("address", {
                  required: "address is Required",
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
              {errors.address && (
                <small className="text-danger">{errors.address.message}</small>
              )}
            </div>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Button
                color="inherit"
                type="submit"
                className="btn btn-primary my-3"
                onClick={UserInfo}
              >
                送信
              </Button>
            </Grid>
          </form>
        </span>
      </Grid>
    </div>
  );
}
