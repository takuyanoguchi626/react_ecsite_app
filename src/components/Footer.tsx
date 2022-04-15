import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar
      position="static"
      sx={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
    >
      <Toolbar>
        <Grid container spacing={8}>
          <Grid item xs={4} md={2}>
            <div>ヘルプ</div>
            <div> カロリー情報</div>
            <div>アレルギー情報</div>
            <div>注文する</div>
            <div>ご注文方法</div>
            <div>お問い合わせ</div>
            <div>FAQ</div>
            <div>サイトマップ</div>
          </Grid>
          <Grid item xs={4} md={2}>
            <div>ヘルプ</div>
            <div> カロリー情報</div>
            <div>アレルギー情報</div>
            <div>注文する</div>
            <div>ご注文方法</div>
            <div>お問い合わせ</div>
            <div>FAQ</div>
            <div>サイトマップ</div>
          </Grid>
          <Grid item xs={4} md={2}>
            <div>ヘルプ</div>
            <div> カロリー情報</div>
            <div>アレルギー情報</div>
            <div>注文する</div>
            <div>ご注文方法</div>
            <div>お問い合わせ</div>
            <div>FAQ</div>
            <div>サイトマップ</div>
          </Grid>
          <Grid item xs={4} md={2}>
            <img
              src="../img_pizza/header_logo.png"
              alt="PIZZA"
              onClick={() => navigate("/")}
            ></img>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    // </Box>
  );
};
