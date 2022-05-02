import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Grid } from "@material-ui/core";
import "../css/footer.css";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{ color: "#e0f2f1", backgroundColor: "#004d40", height: 370 }}
    >
      <Box sx={{ flexGrow: 0 }} pt={2} pb={4}>
        <div className="appBar">
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xs={4} md={2} className="grid">
              <div>ヘルプ</div>
              <div> カロリー情報</div>
              <div>アレルギー情報</div>
              <div>注文する</div>
            </Grid>
            <Grid item xs={4} md={2}>
              <div>ヘルプ</div>
              <div> カロリー情報</div>
              <div>アレルギー情報</div>
              <div>注文する</div>
              <div>ご注文方法</div>
              <div>
                <Link to="/QuestionForm">お問い合わせ</Link>
              </div>
              <div>
                {" "}
                <Link to="/FrequentQuestion">FAQ</Link>
              </div>
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
              <img src="../img_pizza/header_logo.png" alt="PIZZA"></img>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Box sx={{ flexGrow: 0 }} pt={5}>
        <AppBar position="static" sx={{ backgroundColor: "#f0e68c" }}>
          <div className="iconList">
            <span className="iconWraper">
              <img
                className="creditIcon"
                src="/VISAロゴデータ-1.png"
                alt="クレジットカード"
              ></img>
            </span>
            <span className="iconWraper">
              <img
                className="creditIcon"
                src="/jcb.png"
                alt="クレジットカード"
              ></img>
            </span>
            <span className="iconWraper">
              <img
                className="creditIcon"
                src="/MASTERCARDロゴデータ.png"
                alt="クレジットカード"
              ></img>
            </span>
            <span className="iconWraper">
              <img
                className="creditIcon"
                src="/americanexpress.jpg"
                alt="クレジットカード"
              ></img>
            </span>
          </div>
        </AppBar>
      </Box>
      <div className="copyright">
        Copyright rakuraku Pizza Japan, Inc. All Rights Reserved.
      </div>
    </AppBar>
  );
};
