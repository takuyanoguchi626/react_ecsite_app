import { Box, Button, Card, CardMedia, Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AllergyModal from "../components/AllergyInfo";
import { statusContext } from "../components/providers/statusContext";

export const Alergy = () => {
  const navigate = useNavigate();
  const auth = useContext(statusContext);

  return (
    <div className="allergy">
      <Grid justifyContent="center" alignItems="flex-start">
        <Card>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="flex-start"
            sx={{ display: "flex" }}
          >
            <Grid xs={4}>
              <h1>アレルギー情報</h1>
              <h3>アレルギー情報の表示について</h3>
            </Grid>
            <Grid xs={1}>
              <CardMedia
                component="img"
                width="5"
                image="../img/pizza_delivery.png"
                alt=""
              />
            </Grid>
          </Stack>
        </Card>
        <br></br>
        <h3>
          <ul>
            デリバリー商品のアレルギー情報を一覧でご覧いただけます。
            必ず下記の注意事項をご確認の上ご利用ください。
            <br></br>
            <br></br>
            <li>
              アレルギー情報は、商品の原材料として含まれるものを表示しています。
              <br></br>
              店舗や原材料の製造工場では、本来その商品に使用しない食材が混入する可能性があり、また店舗により一部の食材が異なる場合があるなど、
              <br></br>
              絶対的なものではありませんので、ご理解いただけますようお願いいたします。
            </li>
            <li>
              アレルギー物質に対する感受性は、個々人により大きな差がありますので、ご購入に際しては、専門医にご相談の上、お客様ご自身がご判断ください。
            </li>
            <li>
              ドレッシング等を添えて販売している商品は、それらを含んだ情報となっております。
            </li>
            <li>
              原材料の変更等により、情報は随時更新されますのでご注意ください。
            </li>
          </ul>
        </h3>

        <AllergyModal></AllergyModal>
      </Grid>
    </div>
  );
};
