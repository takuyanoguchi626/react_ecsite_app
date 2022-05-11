import React from "react";
import "../css/helpOrder.css";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";

export const HelpOrder = () => {
  return (
    <div>
      <div className="helpOrder">
        <div className="message">
          <h1>注文方法</h1>

          <table className="helpTable">
            <tr>
              <td colSpan={2} align="left">
                <h3>STEP1「注文する」ボタンをクリック</h3>
              </td>
            </tr>
            <tr>
              <td className="helpOrderImg">
                <img src="../orderHere.png" alt="" width="450"></img>
              </td>
              <td>
                トップページの「注文する」から​
                ご希望の注文方法ボタンをクリックします。
              </td>
            </tr>
          </table>
          <br></br>
          <table className="helpTable">
            <tr>
              <td colSpan={2} align="left">
                <h3>STEP2 ご注文方法の選択</h3>
              </td>
            </tr>
            <tr>
              <td>
                <LooksOneIcon />
                「配達」を選択します。​
                ※お持ち帰りをご希望の場合はお持ち帰りを選択してください。 ​
              </td>
              <td>
                <LooksTwoIcon />
                注文店舗を検索します。
                ※地名・駅名などのフリーワード、郵便番号、現在地、地図から検索できます。
              </td>
            </tr>
            <tr>
              <td>
                <Looks3Icon />
                お届け先の詳細を入力します。​
              </td>
              <td>
                <Looks4Icon />
                受け取り日時の選択をします。
              </td>
            </tr>
          </table>
          <br></br>
          <table className="helpTable">
            <tr>
              <td colSpan={2} align="left">
                <h3>STEP3　メニューの選択</h3>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <img src="../itemList.png" alt="" width="300"></img>
              </td>
              <td>
                {" "}
                <img src="../itemList.png" alt="" width="300"></img>
              </td>
            </tr>
            <tr>
              <td>
                <LooksOneIcon />
                ご希望の商品をお選びください。
                ※ナビゲーションを利用することで簡単にお選びいただけます。​
              </td>
              <td>
                <LooksTwoIcon />
                お好みにより「サイズと生地の変更」「トッピングの追加・削除」が可能です。
              </td>
            </tr>
            <tr>
              <td>
                <Looks3Icon />
                「カートに入れる」ボタンをクリックし、商品を確定します。
              </td>
              <td>
                <Looks4Icon />
                クーポンをお持ちの際は「クーポンのご利用はこちら」に​
                クーポン番号を入力し、「決定」をクリックします。
              </td>
            </tr>
          </table>
          <br></br>
          <table className="helpTable">
            <tr>
              <td colSpan={2} align="left">
                <h3>STEP4　お支払い方法の選択</h3>
              </td>
            </tr>
            <tr>
              <td>
                <LooksOneIcon />
                ご注文内容に間違いなければカートの「お会計に進む」をクリックします。
              </td>
              <td>
                <LooksTwoIcon />
                お名前、電話番号、メールアドレスなどお客様情報を入力し、「続ける」をクリックします。
              </td>
            </tr>
          </table>
          <br></br>
          <table className="helpTable">
            <tr>
              <td colSpan={2} align="left">
                <h3>STEP5　ご注文完了</h3>
              </td>
            </tr>
            <tr>
              <td>
                <LooksOneIcon />
                ご注文内容・お支払い方法を確認し、間違いがなければ「注文を確定する」ボタンをクリックすると注文完了となります。
              </td>
              <td>
                <LooksTwoIcon />
                お届けまでのあいだ、ご注文商品の状況をお知らせします。
              </td>
            </tr>
          </table>

          <br />

          <br />
        </div>
      </div>
    </div>
  );
};
