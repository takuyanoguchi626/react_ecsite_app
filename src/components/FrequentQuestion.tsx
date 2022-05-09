import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../css/faq.css";
import { Grid } from "@material-ui/core";

export default function FrequentQuestion() {
  return (
    <div>
      <span className="faq">
        <Typography variant="h2">FAQ</Typography>
      </span>
      .
      <Grid container justifyContent="center" alignItems="flex-start">
        <Accordion sx={{ width: 500 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>受付時間と営業時間について</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              ネット注文でのご予約は24時間いつでも受け付けております。
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      .
      <Grid container justifyContent="center" alignItems="flex-start">
        <Accordion sx={{ width: 500 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>会員登録メールが届かない場合</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              「迷惑メール」フォルダーにメールが振り分けられている場合がございます。
              またお客様ご利用の端末で、ドメイン指定や、メールフィルターなどで、メールを受け取れない可能性がございます。設定を確認し、変更をお願いします。
              配信メールアドレス　：　mail@dominos.jp
              上記をお試し頂いてもメールが届かない場合は、お手数ですが、お客様のご契約されているプロバイダ様（携帯電話会社様）までお問い合わせいただきますよう、お願いします。
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      .
      <Grid container justifyContent="center" alignItems="flex-start">
        <Accordion sx={{ width: 500 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>パスワードの変更方法について</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              パスワードの確認は出来かねます。パスワードが不明の場合には再発行をお願い致します。　「ログイン」ページの
              「パスワードをお忘れの方」よりご登録のメールアドレスをご入力いただき、パスワード再設定のご案内メールをご請求くださいませ。
              ご入力頂いたメールアドレスが間違っている場合、ご入力のメールアドレスで登録が無い場合にはメール配信はされません。
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      .
      <Grid container justifyContent="center" alignItems="flex-start">
        <Accordion sx={{ width: 500 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>ご注文のキャンセルについて</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              「お客様情報」ページにある「ご注文」より、配達前日まではご予約のキャンセルが可能です。ただし配達当日のキャンセルはインターネットでは承れませんので、配達店舗まで直接お電話でお願いします。
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      .
    </div>
  );
}
