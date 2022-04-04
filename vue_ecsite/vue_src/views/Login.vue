<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="row login-page">
        <div class="col s12 z-depth-6 card-panel">
          <div class="error">{{ errorMessage }}</div>
          <form class="login-form" action="employeeList.html">
            <div class="row"></div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">mail_outline</i>
                <span class="error">{{ mailAddressError }}</span>
                <input
                  class="validate"
                  id="mailAddress"
                  type="email"
                  v-model="mailAddress"
                />
                <label for="mailAddress" data-error="wrong" data-success="right"
                  >メールアドレス</label
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <span class="error">{{ passwordError }}</span>
                <input id="password" type="password" v-model="password" />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row login-btn">
              <button class="btn" type="button" v-on:click="login">
                <span>ログイン</span>
              </button>
            </div>
            <div class="row">
              <div class="input-field col s6 m6 l6">
                <p class="margin medium-small">
                  <router-link to="/registerUser"
                    >ユーザー登録はこちら</router-link
                  >
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "../types/User";
import axios from "axios";
@Component
export default class XXXComponent extends Vue {
  // メールアドレス
  private mailAddress = "";
  // パスワード
  private password = "";
  // ログイン時のエラーメッセージ
  private errorMessage = "";
  // メールアドレスのエラーメッセージ
  private mailAddressError = "";
  // パスワードのエラーメッセージ
  private passwordError = "";

  /**
   * ログインをする.
   * @returns Promiseオブジェクト
   */
  async login(): Promise<void> {
    // エラーチェック
    let existError = false;
    if (this.mailAddress === "") {
      this.mailAddressError = "メールアドレスが入力されていません";
      existError = true;
    }
    if (this.password === "") {
      this.passwordError = "パスワードが入力されていません";
      existError = true;
    }
    if (existError === true) {
      return;
    }

    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      {
        email: this.mailAddress,
        password: this.password,
      }
    );
    console.dir("response:" + JSON.stringify(response));
    if (response.data.status === "success") {
      //ログイン状態にする
      this.$store.commit("login");
      this.$router.push("/itemList");
      // reponseからのユーザー情報の取得
      const loginUserInfo = new User(
        response.data.responseMap.user.id,
        response.data.responseMap.user.name,
        response.data.responseMap.user.email,
        response.data.responseMap.user.password,
        response.data.responseMap.user.zipcode,
        response.data.responseMap.user.address,
        response.data.responseMap.user.telephone
      );
      console.dir("loginUserInfo:" + JSON.stringify(loginUserInfo));
      // ユーザーをセットする
      this.$store.commit("setUserInfo", loginUserInfo);
    } else {
      this.errorMessage = "ログインに失敗しました";
    }
  }
}
</script>

<style scoped></style>
