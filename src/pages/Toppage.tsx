import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Card, CardMedia, Grid } from "@material-ui/core";

export const Toppage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <span className="container">
          <Grid container justifyContent="center" alignItems="flex-start">
            <h1>Enjoy our Delicious Pizza</h1>
          </Grid>

          <Grid container justifyContent="center" alignItems="flex-start">
            <CardMedia
              component="img"
              height="500"
              src="../img_pizza/pizza_toppage.png"
            />
            背景を画像にしたりなんやらかんやらする
          </Grid>

          <div>
            <Button
              className="btn"
              style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              ログインしてからオーダーを開始する
            </Button>
            &nbsp; &nbsp;
            <Button
              className="btn"
              style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
              variant="contained"
              onClick={() => navigate("/registerUser")}
            >
              会員登録する
            </Button>
          </div>
        </span>
      </Grid>
    </div>
  );
};
