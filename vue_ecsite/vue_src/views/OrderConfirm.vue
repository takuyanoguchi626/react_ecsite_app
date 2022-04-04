<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">注文内容確認</h1>

        <!-- table -->
        <div class="row">
          <table class="striped">
            <thead>
              <tr>
                <th class="cart-table-th">商品名</th>
                <th>サイズ、価格(税抜)、数量</th>
                <th>トッピング、価格(税抜)</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="orderItem of currentOrder.orderItemList"
                :key="orderItem.id"
              >
                <td class="cart-item-name">
                  <div class="cart-item-icon">
                    <!-- 商品画像 -->
                    <img :src="orderItem.item.imagePath" />
                  </div>
                  <span>{{ orderItem.item.name }}</span>
                </td>
                <td>
                  <span class="price">&nbsp;{{ orderItem.size }}</span
                  >&nbsp;&nbsp;<span v-if="orderItem.size === 'M'">{{
                    orderItem.item.formatPriceM + "円"
                  }}</span>
                  <span v-if="orderItem.size === 'L'">{{
                    orderItem.item.formatPriceL + "円"
                  }}</span
                  >&nbsp;&nbsp;{{ orderItem.quantity }}個
                </td>
                <td>
                  <ul>
                    <li
                      v-for="orderTopping of orderItem.orderToppingList"
                      :key="orderTopping.id"
                    >
                      {{ orderTopping.topping.name }}
                      <span v-if="orderItem.size === 'M'">{{
                        orderTopping.topping.priceM.toLocaleString()
                      }}</span>
                      <span v-if="orderItem.size === 'L'">{{
                        orderTopping.topping.priceL.toLocaleString()
                      }}</span
                      >円
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="text-center">
                    <!-- 商品のトッピングを合わせた合計金額 -->
                    {{ orderItem.getCalcSubTotalPrice().toLocaleString() }}円
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row cart-total-price">
          <!-- 消費税 -->
          <div>消費税：{{ currentOrder.tax.toLocaleString() }}円</div>
          <!-- 合計注文金額 -->
          <div>
            ご注文金額合計：{{ currentOrder.calcTotalPrice.toLocaleString() }}円
            (税込)
          </div>
        </div>

        <h2 class="page-title">お届け先情報</h2>
        <div class="order-confirm-delivery-info">
          <div class="row">
            <button class="btn" type="button" @click="copyUserInfo">
              登録情報から引用する
            </button>
            <span class="errorMessages">
              {{ nameError }}
            </span>
            <div class="input-field">
              <input id="name" type="text" v-model="name" />
              <label v-if="shouldShowLabel" for="name">お名前</label>
            </div>
          </div>
          <div class="row">
            <span class="errorMessages">
              {{ mailError }}
            </span>
            <div class="input-field">
              <input id="email" type="email" v-model="mailAddress" />
              <label v-if="shouldShowLabel" for="email">メールアドレス</label>
            </div>
          </div>
          <div class="row">
            <span class="errorMessages">
              {{ zipCodeError }}
            </span>
            <div class="input-field">
              <input id="zipcode" type="text" maxlength="8" v-model="zipCode" />
              <label v-if="shouldShowLabel" for="zipcode">郵便番号</label>
              <button class="btn" type="button" @click="searchAddress">
                <span>住所検索</span>
              </button>
            </div>
          </div>
          <div class="row">
            <span class="errorMessages">
              {{ addressError }}
            </span>
            <div class="input-field">
              <input id="address" type="text" v-model="address" />
              <label v-if="shouldShowLabel" for="address">住所</label>
            </div>
          </div>
          <div class="row">
            <span class="errorMessages">
              {{ telError }}
            </span>
            <div class="input-field">
              <input id="tel" type="tel" v-model="telephone" />
              <label v-if="shouldShowLabel" for="tel">電話番号</label>
            </div>
          </div>
          <div class="row order-confirm-delivery-datetime">
            <span class="errorMessages">
              {{ deliveryError }}
            </span>
            <div class="input-field">
              <input id="deliveryDate" type="date" v-model="deliveryDate" />
              <label for="address">配達日時</label>
            </div>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="10"
                checked="checked"
                v-model.number="deliveryHour"
              />
              <span>10時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="11"
                v-model.number="deliveryHour"
              />
              <span>11時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="12"
                v-model.number="deliveryHour"
              />
              <span>12時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="13"
                v-model.number="deliveryHour"
              />
              <span>13時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="14"
                v-model.number="deliveryHour"
              />
              <span>14時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="15"
                v-model.number="deliveryHour"
              />
              <span>15時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="16"
                v-model.number="deliveryHour"
              />
              <span>16時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="17"
                v-model.number="deliveryHour"
              />
              <span>17時</span>
            </label>
            <label class="order-confirm-delivery-time">
              <input
                name="deliveryHour"
                type="radio"
                value="18"
                v-model.number="deliveryHour"
              />
              <span>18時</span>
            </label>
          </div>
        </div>

        <h2 class="page-title">お支払い方法</h2>
        <div class="row order-confirm-payment-method">
          <div class="errorMessages">
            <div class="errorMessages">
              {{ paymentMethodError }}
            </div>
          </div>
          <span>
            <label class="order-confirm-payment-method-radio">
              <input
                name="paymentMethod"
                type="radio"
                value="1"
                v-model="paymentMethod"
                checked="checked"
              />
              <span>代金引換</span>
            </label>
            <label class="order-confirm-payment-method-radio">
              <input
                name="paymentMethod"
                type="radio"
                value="2"
                v-model="paymentMethod"
              />
              <span>クレジットカード</span>
            </label>
          </span>

          <div class="order-confirm-delivery-info">
            <div v-if="paymentMethod === '2'">
              <credit-card></credit-card>
              <div class="row">
                <div class="errorMessages">
                  {{ errorMessageOfCreditCardNumber }}
                </div>
                <div class="errorMessages">
                  {{ errorMessageOfCreditCardNumber2 }}
                </div>
                <div class="input-field">
                  <input
                    type="text"
                    v-model.number="card_number"
                    id="creditCardNumber"
                    maxlength="16"
                  />
                  <label for="creditCardNumber">クレジットカード番号</label>
                </div>
              </div>
              <div class="row">
                <div class="errorMessages">
                  {{ errorMessageOfExpiry }}
                </div>
                <div class="col s10 expiry">
                  <span class="expiry2"> 有効期限： </span>
                  <select class="browser-default" v-model="card_exp_month">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option></select
                  >月
                  <select class="browser-default" v-model="card_exp_year">
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    <option value="2036">2036</option>
                    <option value="2037">2037</option>
                    <option value="2038">2038</option></select
                  >年
                </div>
              </div>
              <div class="row">
                <div class="errorMessages">
                  {{ errorMessageOfCardName }}
                </div>
                <div class="input-field">
                  <input type="text" v-model="card_name" id="card_name" />
                  <label for="card_name">カード名義人</label>
                </div>
              </div>
              <div class="row">
                <div class="errorMessages">
                  {{ errorMessageOfCardCvv }}
                </div>
                <div class="errorMessages">
                  {{ errorMessageOfNotNumber }}
                </div>
                <div class="input-field">
                  <input type="text" v-model="card_cvv" id="card_cvv" />
                  <label for="card_cvv">セキュリティーコード</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row order-confirm-btn">
          <!-- 注文エラーメッセージ -->
          <div class="errorMessages">
            {{ orderMessage }}
          </div>
          <button class="btn" type="button" v-on:click="orderConfirm()">
            <span>この内容で注文する</span>
          </button>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { OrderItem } from "../types/OrderItem";
import { Order } from "../types/Order";
import { User } from "../types/User";
import axios from "axios";
import { format, getHours } from "date-fns";
import creditCard from "@/components/creditCard.vue";
@Component({
  components: { creditCard },
})
export default class OrderConfirmComponent extends Vue {
  // 名前
  private name = "";
  // 住所
  private mailAddress = "";
  // 郵便番号
  private zipCode = "";
  // 住所
  private address = "";
  // 電話番号
  private telephone = "";
  // 商品合計金額
  private itemTotalPrice = 0;
  // お届け時間‐日付
  private deliveryDate = "";
  // お届け時間‐時間
  private deliveryHour = "";
  // お届け時間‐支払方法
  private paymentMethod = "";
  //クレジットカード番号
  private card_number = "";
  //有効期限（年）
  private card_exp_year = 0;
  //有効期限（月）
  private card_exp_month = 0;
  //カード名義人
  private card_name = "";
  //セキュリティーコード
  private card_cvv = "";
  //エラーメッセージ（クレジットカード番号）
  private errorMessageOfCreditCardNumber = "";
  //エラーメッセージ（クレジットカード番号 数値チェック）
  private errorMessageOfCreditCardNumber2 = "";
  //エラーメッセージ（クレジットカード有効期限）
  private errorMessageOfExpiry = "";
  //エラーメッセージ（クレジットカード名義人）
  private errorMessageOfCardName = "";
  //エラーメッセージ（クレジットカードセキュリティーコード）
  private errorMessageOfCardCvv = "";
  //エラーメッセージ（クレジットカード数字入力）
  private errorMessageOfNotNumber = "";
  //エラーチェック
  private errorCheck = false;
  //
  private shouldShowLabel = true;
  //  カートのアイテム情報
  private currentOrder = new Order(
    0,
    0,
    0,
    0,
    new Date(),
    "",
    "",
    "",
    "",
    "",
    new Date(),
    0,
    new User(0, "", "", "", "", "", ""),
    Array<OrderItem>()
  );
  // 注文エラーメッセージ
  private orderMessage = "";
  // 名前エラーメッセージ
  private nameError = "";
  // メールアドレスエラーメッセージ
  private mailError = "";
  // 郵便番号エラーメッセージ
  private zipCodeError = "";
  // 住所エラーメッセージ
  private addressError = "";
  // 電話番号エラーメッセージ
  private telError = "";
  // 配達日時エラーメッセージ
  private deliveryError = "";
  // 支払方法エラーメッセージ
  private paymentMethodError = "";
  // エラーフラグ
  private errorFlag = false;
  private errorFlag2 = false;

  // 注文内容を表示する
  created(): void {
    this.currentOrder = this.$store.getters.getUserOrderInfo;
  }
  /**
   * 郵便番号から住所を取得する
   */
  async searchAddress(): Promise<void> {
    // 郵便番号エラー
    if (this.zipCode === "") {
      this.zipCodeError = "郵便番号を入力してください";
      this.errorFlag = true;
    } else if (this.zipCode !== "") {
      let searchIndex = 0;
      for (let i = 0; i <= this.zipCode.length; i++) {
        if (this.zipCode[i] == "-") {
          searchIndex++;
        }
      }
      if (searchIndex !== 1) {
        this.zipCodeError = "郵便番号はXXX-XXXXの形式で入力してください";
        this.errorFlag = true;
      } else {
        this.zipCodeError = "";
        this.errorFlag = false;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const axios = require("axios");
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const axiosJsonpAdapter = require("axios-jsonp");

        const response = await axios.get("https://zipcoda.net/api", {
          adapter: axiosJsonpAdapter,
          params: {
            zipcode: this.zipCode,
          },
        });
        console.dir(JSON.stringify(response));
        this.address = response.data.items[0].address;
      }
    }
  }

  /**
   * 注文する.
   *
   * @remarks 最初に選択された日付をフォーマットし、
   * WEBAPIに送った後、結果によって画面遷移やエラーを表示する
   *
   * @returns-Promiseオブジェクト
   */
  async orderConfirm(): Promise<void> {
    // 現時点の時間の取得
    let nowDate = new Date();
    // 現時点より3時間後
    let threeHoursAfter = getHours(Number(nowDate)) + 3;

    // エラー処理
    if (this.name === "") {
      this.nameError = "名前を入力してください";
      this.errorFlag = true;
    } else {
      this.nameError = "";
      this.errorFlag = false;
    }
    if (this.mailAddress === "") {
      this.mailError = "メールアドレスを入力してください";
      this.errorFlag = true;
    } else if (this.mailAddress.indexOf("@") === -1) {
      this.mailError = "メールアドレスの形式が不正です";
      this.errorFlag = true;
    } else {
      this.mailError = "";
      this.errorFlag = false;
    }
    // 郵便番号エラー
    if (this.zipCode === "") {
      this.zipCodeError = "郵便番号を入力してください";
      this.errorFlag = true;
    } else if (this.zipCode !== "") {
      let searchIndex = 0;
      for (let i = 0; i <= this.zipCode.length; i++) {
        if (this.zipCode[i] == "-") {
          searchIndex++;
        }
      }
      if (searchIndex !== 1) {
        this.zipCodeError = "郵便番号はXXX-XXXXの形式で入力してください";
        this.errorFlag = true;
      } else {
        this.zipCodeError = "";
        this.errorFlag = false;
      }
    }
    if (this.address === "") {
      this.addressError = "住所を入力してください";
      this.errorFlag = true;
    } else {
      this.addressError = "";
      this.errorFlag = false;
    }
    // 電話番号エラー処理
    if (this.telephone === "") {
      this.telError = "電話番号を入力してください";
      this.errorFlag = true;
    }
    if (this.telephone !== "") {
      let searchIndex = 0;
      for (let i = 0; i <= this.telephone.length; i++) {
        if (this.telephone[i] == "-") {
          searchIndex++;
        }
      }
      if (searchIndex !== 2) {
        this.telError = "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
        this.errorFlag = true;
      } else {
        this.telError = "";
        this.errorFlag = false;
      }
    }

    // 日付条件エラー処理
    if (this.deliveryDate === "" || this.deliveryHour === "") {
      this.deliveryError = "";
      this.deliveryError = "配達日時を入力してください";
      this.errorFlag2 = true;
    }

    if (this.deliveryDate !== "") {
      // 配達日時フォーマット
      let formatNowDate = format(nowDate, "yyyy/MM/dd");
      let deliveryDate = format(new Date(this.deliveryDate), "yyyy/MM/dd");

      // 正常の場合
      if (deliveryDate >= formatNowDate) {
        this.deliveryError = "";
        this.errorFlag2 = false;
      }

      // 日付が注文時点の場合
      if (deliveryDate === formatNowDate) {
        if (Number(this.deliveryHour) < threeHoursAfter) {
          this.deliveryError = "";
          this.deliveryError = "今から3時間後の日時をご入力ください";
          this.errorFlag2 = true;
        }
      }
      // 日付が注文時点より前の場合
      if (deliveryDate < formatNowDate) {
        if (deliveryDate < formatNowDate) {
          this.deliveryError = "";
          this.deliveryError = "本日より前の日付を入力しないでください";
          this.errorFlag2 = true;
        }
      }
    }
    // 支払方法のエラー処理
    if (this.paymentMethod === "") {
      this.paymentMethodError = "支払方法を選択してください";
      this.errorFlag = true;
    } else {
      this.paymentMethodError = "";
      this.errorFlag = false;
    }

    if (this.errorFlag === true || this.errorFlag2 === true) {
      this.orderMessage = "注文できませんでした";
      return;
    }

    //クレジットカード決済処理
    this.errorMessageOfCreditCardNumber = "";
    this.errorMessageOfCreditCardNumber2 = "";
    this.errorMessageOfExpiry = "";
    this.errorMessageOfCardName = "";
    this.errorMessageOfNotNumber = "";
    this.errorMessageOfCardCvv = "";
    this.errorCheck = false;
    if (this.paymentMethod === "2") {
      const responce2 = await axios.post(
        "http://153.127.48.168:8080/sample-credit-card-web-api/credit-card/payment",
        {
          user_id: this.currentOrder.userId,
          order_number: this.zipCode + this.paymentMethod + 12345678,
          amount: this.currentOrder.calcTotalPrice,
          card_number: this.card_number,
          card_exp_year: this.card_exp_year,
          card_exp_month: this.card_exp_month,
          card_name: this.card_name,
          card_cvv: this.card_cvv,
        }
      );

      if (typeof this.card_number !== "number") {
        this.errorMessageOfCreditCardNumber2 =
          "クレジットカード番号は数字で入力してください";
        this.errorCheck = true;
      }

      if (String(this.card_number).length !== 16) {
        this.errorMessageOfCreditCardNumber =
          "クレジットカード番号の桁数が間違っています";
        this.errorCheck = true;
      }
      if (this.card_name === "") {
        this.errorMessageOfCardName =
          "クレジットカードの名義人を入力してください";
        this.errorCheck = true;
      }
      if (responce2.data.error_code === "E-01") {
        this.errorMessageOfExpiry = "有効期限がきれています";
        this.errorCheck = true;
      }
      if (responce2.data.error_code === "E-02") {
        this.errorMessageOfCardCvv = "セキュリティーコードが間違っています";
        this.errorCheck = true;
      }
      if (responce2.data.error_code === "E-03") {
        this.errorMessageOfNotNumber =
          "セキュリティーコードは数字で入力してください";
        this.errorCheck = true;
      }
      if (this.errorCheck === true) {
        return;
      }
    }

    // 支払方法によるステータスの送信
    if (this.paymentMethod === "1") {
      this.currentOrder.status = 1;
    } else if (this.paymentMethod === "2") {
      this.currentOrder.status = 2;
    }

    // 日付の取得
    let deliveryTime = format(
      new Date(this.deliveryDate + "T" + this.deliveryHour + ":00:00"),
      "yyyy/MM/dd HH:mm:ss"
    );

    const orderItemList = this.currentOrder.orderItemList;
    let orderItemFormList = [];
    for (let orderItem of orderItemList) {
      let orderToppingFormList = [];
      for (let orderTopping of orderItem.orderToppingList) {
        orderToppingFormList.push({
          toppingId: orderTopping.topping.id,
        });
      }
      orderItemFormList.push({
        itemId: orderItem.itemId,
        quantity: orderItem.quantity,
        size: orderItem.size,
        orderToppingFormList: orderToppingFormList,
      });
    }
    console.dir(JSON.stringify(orderItemFormList));

    // 価格をsetする.
    this.itemTotalPrice = this.currentOrder.calcTotalPrice;

    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/order`,
      {
        userId: this.currentOrder.user.id,
        status: this.currentOrder.status,
        totalPrice: this.itemTotalPrice,
        destinationName: this.name,
        destinationEmail: this.mailAddress,
        destinationZipcode: this.zipCode,
        destinationAddress: this.address,
        destinationTel: this.telephone,
        deliveryTime: deliveryTime,
        paymentMethod: this.paymentMethod,
        orderItemFormList: orderItemFormList,
      }
    );
    // 結果を受け取り、成功の場合はTOPページへ遷移する.
    if (response.data.status === "success") {
      this.$store.commit("resetUserOrderInfo");
      this.$router.push("/orderFinished");
    } else {
      this.orderMessage = "注文できませんでした。";
    }
  }

  /**
   * ユーザ情報を反映する.
   */
  copyUserInfo(): void {
    this.shouldShowLabel = false;
    const userLoginInfo = this.$store.getters.getUserLoginInfo;
    console.dir(userLoginInfo);
    this.name = userLoginInfo.name;
    this.mailAddress = userLoginInfo.email;
    this.zipCode = userLoginInfo.zipcode;
    this.telephone = userLoginInfo.telephone;
    this.address = userLoginInfo.address;
  }
}
</script>

<style scoped>
.expiry {
  display: flex;
  align-items: center;
}
.expiry2 {
  width: 400px;
}
.errorMessages {
  font-weight: bold;
  color: red;
}
</style>
