import React from "react";
import { Box, Grid, Input, Typography } from "@material-ui/core";
import "../css/errorPage.css";

export const ErrorPage = () => {
  return (
    <div>
      <br />
      <Grid container justifyContent="center" alignItems="flex-start">
        <span className="errorImage">
          <br />
        </span>
        <span className="errorMessage">
          <p>404エラー </p>
          <p>申し訳ありません、ページが見つかりませんでした…</p>
          <br />
          <img
            src="img/error_image.png"
            alt="test"
            style={{
              width: "300px",
              height: "300px",
            }}
          />
        </span>
      </Grid>
    </div>
  );
};
