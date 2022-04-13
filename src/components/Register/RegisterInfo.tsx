import { useForm } from "react-hook-form";

export function RegisterInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  // console.log(watch());

  // console.log(errors.name)

  return (
    <div className="container pt-5">
      <div className="row justify-content-sm-center pt-5">
        <div className="col-sm-6 shadow round pb-3">
          <h1 className="text-center pt-3 text-secondary">会員登録画面</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-form-label">名前:</label>
              <input
                type="text"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", { required: "Name is Required" })}
                onKeyUp={() => {
                  trigger("name");
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
                onKeyUp={() => {
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
                className={`form-control ${errors.phone && "invalid"}`}
                {...register("phone", {
                  required: "Phone is Required",
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Invalid phone no",
                  },
                })}
                onKeyUp={() => {
                  trigger("phone");
                }}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label">パスワード:</label>
              <input
                type="text"
                className={`form-control ${errors.password && "invalid"}`}
                {...register("password", { required: "Password is Required" })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
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
                onKeyUp={() => {
                  trigger("zipcode");
                }}
              />
              {errors.zipcode && (
                <small className="text-danger">{errors.zipcode.message}</small>
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
                onKeyUp={() => {
                  trigger("address");
                }}
              />
              {errors.address && (
                <small className="text-danger">{errors.address.message}</small>
              )}
            </div>

            <input
              type="submit"
              className="btn btn-primary my-3"
              value="Send message"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
