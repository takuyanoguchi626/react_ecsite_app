import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

export const Toppage = () => {
  const navigate = useNavigate();
  // 参考サイト
  // http://www.salvatore.jp/restaurant/daikanyama/
  // http://www.da-isa.jp/
  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid container justifyContent="center" alignItems="flex-start">
          <h1>Enjoy our Delicious Pizza</h1>
        </Grid>
        <Grid container justifyContent="center" alignItems="flex-start">
          <CardMedia
            component="img"
            height="500"
            src="../img_pizza/pizza_toppage.png"
          />
        </Grid>
        <br></br>

        <Box sx={{ flexGrow: 0 }} pt={2} pb={4}>
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xs={6}>
              <Button
                className="btn"
                style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
                variant="contained"
                onClick={() => navigate("/login")}
              >
                ログインしてからオーダーを開始する
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                className="btn"
                style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
                variant="contained"
                onClick={() => navigate("/registerUser")}
              >
                会員登録する
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">
                <div>
                  ﾟ･*:.｡. .｡.:*･゜まずはここからチェックﾟ･*:.｡. .｡.:*･゜ﾟ
                </div>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Button
                className="btn"
                style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
                variant="contained"
                onClick={() => navigate("/itemList")}
              >
                メニューを見る
              </Button>
            </Grid>
          </Grid>
        </Box>
        <br />
        <Grid xs={10} spacing={2} direction="row">
          <Box sx={{ mt: 2, pt: 2, marginBottom: 2 }}>
            <Card>
              <Grid xs={2}>
                <CardMedia
                  component="img"
                  height="20%"
                  src="../italianMan.png"
                />
              </Grid>
              <CardContent>
                <Grid xs={8}>
                  <Typography variant="h5">
                    ナポリピッツァを日本に広めた功労者 <br></br>
                    サルヴァトーレ・クオモがプロデュースするピッツェリア
                  </Typography>
                  <Typography variant="h6">
                    イタリアの窯職人が作ったピッツァ窯の中で焼き上げるナポリピッツァは、薄生地なのにもちもちで、薪のかおりが香ばしい逸品です。
                    <br></br>
                    ご家族、仲間同士のディナーやパーティに、わいわい楽しくイタリアンスタイルでお楽しみ下さい。
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <div></div>
      </Grid>
    </div>
  );
};
