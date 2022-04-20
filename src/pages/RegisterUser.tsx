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

  const [registerData, setregisterData] = useState<User>({
    name: "山田太郎",
    mailAddress: "d@gmail.com",
    password: "password",
    zipcode: "123-4567",
    address: "新宿三丁目",
    telephone: "123-4567-8910",
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
  // console.log(watch());

  // console.log(errors.name)

  return (
    <div className="container pt-5">
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid container justifyContent="center" alignItems="flex-start">
          <h1>会員登録フォーム</h1>
        </Grid>
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
              value={registerData.name}
              onKeyUp={(e) => {
                setregisterData({
                  ...registerData,
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
            {/* <Grid container spacing={3}> */}
            {/* <Grid alignItems="flex-start" xs={2} spacing={2}> */}
            <label className="col-form-label">
              <EmailIcon />
            </label>
            {/* </Grid> */}
            {/* <Grid alignItems="flex-start" xs={2} spacing={2}> */}
            <Input
              type="text"
              className={`form-control ${errors.mailAddress && "invalid"}`}
              {...register("mailAddress", {
                required: "Email is Required",
                // pattern: {
                //   message: "Invalid email address",
                // },
              })}
              value={registerData.mailAddress}
              onKeyUp={(e) => {
                setregisterData({
                  ...registerData,
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
            {/* </Grid> */}
            {/* </Grid> */}
          </div>

          <div className="form-group">
            {/* <Grid container spacing={3}> */}
            {/* <Grid alignItems="flex-start" xs={2} spacing={2}> */}
            <label className="col-form-label">
              <PhoneIcon />
            </label>
            {/* </Grid> */}
            {/* <Grid alignItems="flex-start" xs={2} spacing={2}> */}
            <Input
              type="text"
              className={`form-control ${errors.telephone && "invalid"}`}
              {...register("telephone", {
                required: "Phone is Required",
                // pattern: {
                //   message: "Invalid phone no",
                // },
              })}
              value={registerData.telephone}
              onKeyUp={(e) => {
                setregisterData({
                  ...registerData,
                  telephone: e.currentTarget.value,
                });
                trigger("telephone");
              }}
            />
            {errors.telephone && (
              <small className="text-danger">{errors.telephone.message}</small>
            )}
            {/* </Grid> */}
            {/* </Grid> */}
          </div>

          <div className="form-group">
            <label className="col-form-label">
              <LockIcon />
            </label>
            <Input
              type="text"
              className={`form-control ${errors.password && "invalid"}`}
              {...register("password", {
                required: "Password is Required",
              })}
              value={registerData.password}
              onKeyUp={(e) => {
                setregisterData({
                  ...registerData,
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
            <label className="col-form-label">郵便番号:</label>
            <Input
              type="text"
              className={`form-control ${errors.zipcode && "invalid"}`}
              {...register("zipcode", {
                required: "zipcode is Required",
              })}
              value={registerData.zipcode}
              onKeyUp={(e) => {
                setregisterData({
                  ...registerData,
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
              value={registerData.address}
              onKeyUp={(e) => {
                setregisterData({
                  ...registerData,
                  address: e.currentTarget.value,
                });
                trigger("address");
              }}
            />
            {errors.address && (
              <small className="text-danger">{errors.address.message}</small>
            )}
          </div>

          <Button
            color="inherit"
            type="submit"
            className="btn btn-primary my-3"
            onClick={UserInfo}
          >
            送信
          </Button>
        </form>
      </Grid>
    </div>
  );
}
