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
import PhoneIcon from "@mui/icons-material/Phone";

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

        {/* デリバリーなら大徳というプロモーションバナー */}
        <img src="../promotion.png" alt="" width="70%" />

        {/* CTRをまとめたセクション */}
        <table>
          <tr>.</tr>
          <tr>
            <td align="center">
              <Button
                className="btn"
                style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
                variant="contained"
                onClick={() => navigate("/login")}
              >
                ログインする
              </Button>
            </td>
            <td align="center">
              <Button
                className="btn"
                style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
                variant="contained"
                onClick={() => navigate("/registerUser")}
              >
                会員登録する
              </Button>
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <Typography variant="h6">
                <div>
                  ﾟ･*:.｡. .｡.:*･゜まずはここからチェックﾟ･*:.｡. .｡.:*･゜ﾟ
                </div>
              </Typography>
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <Button
                className="btn"
                style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
                variant="contained"
                onClick={() => navigate("/itemList")}
              >
                メニューを見る
              </Button>
            </td>
          </tr>
          <tr>.</tr>
        </table>

        {/* 創業者をPRするセクション */}
        <Card>
          <table>
            <tr>
              <th rowSpan={2}>
                {" "}
                <img src="../italianMan.png" alt="" width="200" />
              </th>

              <td>
                {" "}
                <Typography variant="h5">
                  ナポリピッツァを日本に広めた功労者 <br></br>
                  サルヴァトーレ・クオモがプロデュースするピッツェリア
                </Typography>
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <Typography variant="h6">
                  イタリアの窯職人が作ったピッツァ窯の中で焼き上げるナポリピッツァは、薄生地なのにもちもちで、薪のかおりが香ばしい逸品です。
                  ご家族、仲間同士のディナーやパーティに、わいわい楽しくイタリアンスタイルでお楽しみ下さい。
                </Typography>
              </td>
            </tr>
          </table>
        </Card>
        <br></br>

        {/* 住所、問い合わせ先とバナーを合わせたセクション */}
        <table>
          <tr>.</tr>
          <tr>
            <td colSpan={2}>〒150-0032 東京都渋谷区鶯谷町19-19 第三叶ビル1F</td>
            <td rowSpan={2}>
              {" "}
              <img src="../banner1.png" alt="" width="350" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              {" "}
              東急東横線「代官山駅」から徒歩約10分
              <br />
              JR線「渋谷駅」南口から徒歩約10分
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="h6">
                {" "}
                <PhoneIcon />
                ご予約お問い合わせ
              </Typography>
            </td>
            <td>
              <Typography variant="h6">03-1234-5678&nbsp;&nbsp;</Typography>
            </td>
            <td rowSpan={2}>
              {" "}
              <img src="../banner2.png" alt="" width="350" />
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="h6">
                {" "}
                <PhoneIcon />
                デリバリー専用ダイアル
              </Typography>
            </td>
            <td>
              <Typography variant="h6">03-9876-5432&nbsp;&nbsp;</Typography>
            </td>
          </tr>
          <tr>.</tr>
        </table>
      </Grid>
    </div>
  );
};
