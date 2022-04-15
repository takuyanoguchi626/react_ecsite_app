import { useForm } from "react-hook-form";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  zipcode: string;
  address: string;
  telephone: string;
}

export const RegisterInfo = () => {
  const {
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerData);
    reset();
  };

  const [registerData, setregisterData] = useState<User>({
    id: 0,
    name: "山田太郎",
    email: "taro@taro",
    password: "password",
    zipcode: "123-4567",
    address: "新宿三丁目",
    telephone: "123-4567-8910",
  });

  const UserInfo = async () => {
    const navigate = useNavigate();
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user",
      {
        registerData,
      }
    );
    const status = response.data.status;
    if (status === "success") {
      console.log("成功");
      navigate("/ItemList");
    } else if (status.errorCode === "E-01") {
      console.log("そのメールアドレスはすでに使われています");
      alert("そのメールアドレスはすでに使われています");
    } else {
      console.log("登録できませんでした");
      alert("登録できませんでした");
    }

    return (
      <div className="container pt-5">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-sm-6 shadow round pb-3">
            <h1 className="text-center pt-3 text-secondary">会員登録画面</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="col-form-label">名前:</label>
                <input
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
                <label className="col-form-label">Email:</label>
                <input
                  type="text"
                  className={`form-control ${errors.email && "invalid"}`}
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  value={registerData.email}
                  onKeyUp={(e) => {
                    setregisterData({
                      ...registerData,
                      email: e.currentTarget.value,
                    });
                    trigger("email");
                  }}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">電話番号:</label>
                <input
                  type="text"
                  className={`form-control ${errors.telephone && "invalid"}`}
                  {...register("telephone", {
                    required: "Phone is Required",
                    pattern: {
                      value:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                      message: "Invalid phone no",
                    },
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
                  <small className="text-danger">
                    {errors.telephone.message}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="col-form-label">パスワード:</label>
                <input
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
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="col-form-label">郵便番号:</label>
                <input
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
                  <small className="text-danger">
                    {errors.zipcode.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">住所:</label>
                <input
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
                  <small className="text-danger">
                    {errors.address.message}
                  </small>
                )}
              </div>

              <input
                type="submit"
                className="btn btn-primary my-3"
                value="情報承認"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={UserInfo}
              />
            </form>
          </div>
        </div>
      </div>
    );
  };
};
