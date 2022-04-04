<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="row register-page">
        <div class="error">{{ errorMessage }}</div>
        <span class="error">{{ nameError }}</span>
        <div class="row">
          <div class="input-field col s6">
            <input
              id="last_name"
              type="text"
              class="validate"
              required
              v-model="lastName"
            />
            <label for="last_name">姓</label>
          </div>
          <div class="input-field col s6">
            <input
              id="first_name"
              type="text"
              class="validate"
              required
              v-model="firstName"
            />
            <label for="first_name">名</label>
          </div>
        </div>
        <span class="error">{{ mailAddressError }}</span>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              required
              v-model="mailAddress"
            />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <span class="error">{{ zipCodeError }}</span>
        <div class="row">
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="8" v-model="zipCode" />
            <label for="zipcode">郵便番号(ハイフンあり)</label>
            <button class="btn" type="button" v-on:click="searchAddress">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <span class="error">{{ addressError }}</span>
        <div class="row">
          <div class="input-field col s12">
            <input id="address" type="text" v-model="address" />
            <label for="address">住所</label>
          </div>
        </div>
        <span class="error">{{ telephoneError }}</span>
        <div class="row">
          <div class="input-field col s12">
            <input id="tel" type="tel" maxlength="14" v-model="telephone" />
            <label for="tel">電話番号(ハイフンあり)</label>
          </div>
        </div>
        <span class="error">{{ passwordError }}</span>
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model="password"
              id="password"
              type="password"
              class="validate"
              minlength="8"
              maxlength="16"
              required
            />
            <label for="password">パスワード</label>
          </div>
        </div>
        <span class="error">{{ confirmationPasswordError }}</span>
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model="confirmationPassword"
              id="confirmation_password"
              type="password"
              class="validate"
              minlength="8"
              maxlength="16"
              required
            />
            <label for="confirmation_password">確認用パスワード</label>
          </div>
        </div>
        <div class="error">{{ errorMessage }}</div>
        <div class="row register-admin-btn">
          <button class="btn" type="button" v-on:click="registerUser">
            <span>登録<i class="material-icons right">done</i></span>
          </button>
          <button class="btn" type="button" v-on:click="clear">クリア</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
// import bcrypt from "bcrypt";
@Component
export default class XXXComponent extends Vue {
  // 姓
  private lastName = "";
  // 名
  private firstName = "";
  // メールアドレス
  private mailAddress = "";
  // 郵便番号
  private zipCode = "";
  // 住所
  private address = "";
  // 電話番号
  private telephone = "";
  // パスワード
  private password = "";
  // 確認用パスワード
  private confirmationPassword = "";
  // 名前のエラー
  private nameError = "";
  // メールアドレスのエラー
  private mailAddressError = "";
  // 郵便番号のエラー
  private zipCodeError = "";
  // 住所のエラー
  private addressError = "";
  // 電話番号のエラー
  private telephoneError = "";
  // パスワードのエラー
  private passwordError = "";
  // 確認用パスワードのエラー
  private confirmationPasswordError = "";
  // 登録時のエラーメッセージ
  private errorMessage = "";

  /**
   * ユーザー情報を登録する.
   * @returns Promiseオブジェクト
   */
  async registerUser(): Promise<void> {
    // 正規表示を定義
    const regex = /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,16}$/;
    // const regex1 = /^(?=.*[@])[a-zA-Z0-9@]{8,16}$/;
    // エラーチェック
    let existError = false;
    // 名前のエラー
    if (this.lastName === "" || this.firstName === "") {
      this.nameError = "姓または名が入力されていません";
      existError = true;
    } else {
      this.nameError = "";
    }
    // メールアドレスのエラー
    if (this.mailAddress === "") {
      this.mailAddressError = "メールアドレスが入力されていません";
      existError = true;
    } else if (this.mailAddress.indexOf("@") === -1) {
      this.mailAddressError = "メールアドレスの形式が不正です";
      existError = true;
    } else {
      this.mailAddressError = "";
    }
    // 郵便番号のエラー
    if (this.zipCode === "") {
      this.zipCodeError = "郵便番号が入力されていません";
      existError = true;
    } else if (this.zipCode !== "") {
      let searchIndex = 0;
      for (let i = 0; i <= this.zipCode.length; i++) {
        if (this.zipCode[i] == "-") {
          searchIndex++;
        }
      }
      if (searchIndex !== 1) {
        this.zipCodeError = "郵便番号はXXX-XXXXの形式で入力してください";
        existError = true;
      } else {
        this.zipCodeError = "";
      }
    }
    // 住所のエラー
    if (this.address === "") {
      this.addressError = "住所が入力されていません";
      existError = true;
    } else {
      this.addressError = "";
    }
    // 電話番号のエラー
    if (this.telephone === "") {
      this.telephoneError = "電話番号が入力されていません";
      existError = true;
    } else if (this.telephone !== "") {
      let searchIndex = 0;
      for (let i = 0; i <= this.telephone.length; i++) {
        if (this.telephone[i] == "-") {
          searchIndex++;
        }
      }
      if (searchIndex !== 2) {
        this.telephoneError =
          "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
        existError = true;
      } else {
        this.telephoneError = "";
      }
    }
    // パスワードのエラー
    if (this.password === "") {
      this.passwordError = "パスワードが入力されていません";
      existError = true;
    } else if (this.password.length < 8 || this.password.length > 16) {
      this.passwordError = "パスワードは8文字以上16文字以内で設定してください";
      existError = true;
    } else if (!regex.test(this.password)) {
      this.passwordError =
        "パスワードは英語小文字・大文字、数字、記号(.?/-)をそれぞれ1つ以上使用して設定してください";
      existError = true;
    } else {
      this.passwordError = "";
    }
    // 確認用パスワードのエラー
    if (this.password !== this.confirmationPassword) {
      this.confirmationPasswordError =
        "パスワードと確認用パスワードが不一致です";
      existError = true;
    } else {
      this.confirmationPasswordError = "";
    }
    // 1つでもエラーがある場合は処理を終了する
    if (existError === true) {
      return; //処理終了のreturn
    }

    // const hashedPassword = await bcrypt.hash(this.password, 10);
    //   password: hashedPassword,

    const responce = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user",
      {
        name: this.lastName + this.firstName,
        email: this.mailAddress,
        password: this.password,
        zipcode: this.zipCode,
        address: this.address,
        telephone: this.telephone,
      }
    );
    console.dir("responce:" + JSON.stringify(responce));
    if (responce.data.status === "success") {
      this.$router.push("/login");
    } else if (responce.data.errorCode === "E-01") {
      this.mailAddressError = "そのメールアドレスはすでに使われています";
    } else {
      this.errorMessage = "登録できませんでした";
    }
  }
  /**
   * 入力された情報をクリアする.
   */
  clear(): void {
    this.lastName = "";
    this.firstName = "";
    this.mailAddress = "";
    this.zipCode = "";
    this.address = "";
    this.telephone = "";
    this.password = "";
    this.confirmationPassword = "";
  }
  /**
   * 郵便番号から住所を取得する
   */
  async searchAddress(): Promise<void> {
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
</script>

<style scoped></style>
