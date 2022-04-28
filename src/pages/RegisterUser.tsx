import { Button, Grid, Input } from "@material-ui/core";
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

  const [registerData, setregisterData] = useState<User>({
    name: "",
    mailAddress: "",
    password: "",
    zipcode: "",
    address: "",
    telephone: "",
  });

  const UserInfo = async () => {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user",
      {
        name: registerData.name,
        email: registerData.mailAddress,
        password: registerData.password,
        zipcode: registerData.zipcode,
        address: registerData.address,
        telephone: registerData.telephone,
      }
    );
    const status = response.data.status;
    console.dir("responce:" + JSON.stringify(response));
    if (status === "success") {
      console.log("成功");
      navigate("/AfterRegister");
    } else if (response.data.errorCode === "E-01") {
      console.log("そのメールアドレスはすでに使われています");
      alert("そのメールアドレスはすでに使われています");
    } else {
      console.log("登録できませんでした");
      alert("登録できませんでした");
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
                {...register("name", { minLength: 1 })}
                value={registerData.name}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    name: e.currentTarget.value,
                  });
                  trigger("name");
                }}
              />
              {errors.name && "名前を記入してください"}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <EmailIcon />
              </label>

              <Input
                type="text"
                {...register("mailAddress", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "正しいメールアドレスの形式で入力してください。",
                  },
                })}
                value={registerData.mailAddress}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    mailAddress: e.currentTarget.value,
                  });
                  trigger("mailAddress");
                }}
              />
              {errors.mailAddress && "メールアドレスは正しく記入してください"}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <PhoneIcon />
              </label>

              <Input
                type="text"
                {...register("telephone", { max: 11 })}
                value={registerData.telephone}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    telephone: e.currentTarget.value,
                  });
                  trigger("telephone");
                }}
              />
              {errors.telephone && "電話番号は11桁以内で記入してください"}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <LockIcon />
              </label>

              <Input
                type="text"
                {...register("password", {
                  minLength: 5,
                })}
                value={registerData.password}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    password: e.currentTarget.value,
                  });
                  trigger("password");
                }}
              />
              {errors.password && "5文字以上のパスワードを記入してください"}
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <img src="../zipcodeIcon.png" width="30" alt="" />
              </label>
              <Input
                type="text"
                {...register("zipcode", {
                  minLength: 5,
                })}
                value={registerData.zipcode}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    zipcode: e.currentTarget.value,
                  });
                  trigger("zipcode");
                }}
              />
              {errors.zipcode && "郵便番号は5桁以上で記入してください"}
            </div>
            <div className="form-group">
              <label className="col-form-label">
                <HomeIcon />
              </label>
              <Input
                type="text"
                {...register("address", {
                  minLength: 3,
                })}
                value={registerData.address}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
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
