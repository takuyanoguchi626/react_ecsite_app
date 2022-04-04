<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <a href="top.html">
            <router-link to="/top">
              <img class="logo" src="/img_aloha/header_logo.png"
            /></router-link>
          </a>
        </div>

        <div class="header-right">
          <router-link to="/ItemList">商品一覧</router-link>

          <router-link to="/RegisterUser" v-if="!canLogin"
            >会員登録</router-link
          >
          <!-- <a href="#"><i class="fas fa-shopping-cart"></i>カート</a> -->
          <router-link to="/cartList"
            ><i class="fas fa-shopping-cart"></i>カート</router-link
          >
          <router-link to="/login" class="login" v-if="!canLogin">
            <i class="fas fa-sign-in-alt"></i>ログイン</router-link
          >
          <router-link to="/logout" class="login" v-if="canLogin">
            <i class="fas fa-sign-in-alt"></i>ログアウト</router-link
          >
          <router-link to="/orderHistory" v-if="canLogin">注文履歴</router-link>
        </div>
      </div>
      <!-- スマートフォン用のメニューアイコン -->
      <div class="menu-icon">
        <span class="fa fa-bars"></span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {
  //ログイン状態の可否を返す
  get canLogin(): boolean {
    return this.$store.getters.getLogStatus;
  }
}
</script>

<style scoped></style>
