<template>
  <div>
    <div class="main-top-wrapper">
      <div class="container">
        <h1>DELIVERING THE FEELINGS OF ALOHA TO YOU</h1>
        <p>日本にいながらアロハな気分をあなたにお届け！</p>
        <p>
          ラクラクアロハは自宅にハワイアン料理がデリバリーで届くハワイアンECサイトです。
        </p>
        <div class="btn-wrapper">
          <!-- <a href="register_admin.html" >会員登録</a> -->
          <router-link to="/registerUser" class="btn signup"
            >会員登録</router-link
          >
          <!-- <p>or</p>
          <a href="#" class="btn facebook"
            ><i class="fab fa-facebook"></i>Facebookで登録</a
          >
          <a href="#" class="btn twitter"
            ><i class="fab fa-twitter"></i>Twitterで登録</a
          > -->
        </div>
      </div>
    </div>

    <div class="top-item-wrapper">
      <div class="container">
        <div class="heading">
          <h2>ラクラクアロハ、４つの特徴！</h2>
        </div>
        <div class="top-items">
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img_aloha/1.jpg" />
              <p>ハワイアン料理</p>
            </div>
            <p class="text-contents">
              アロハテーブルやウルフギャング、田中オブ東京などのハワイの有名店で修行を積んだ一流シェフによる本格的なハワイアン料理が家にいてもお手軽に楽しむことができます。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img_aloha/2.jpg" />
              <p>スイーツも充実</p>
            </div>
            <p class="text-contents">
              アイランドビンテージコーヒーやボガーツカフェのアサイボウルはもちろんのこと、最近流行りのバナンのソフトクリーム、エッグスンシングスのふわふわパンケーキなど有名店のスイーツも充実しています。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img_aloha/14.jpg" />
              <p>アルコールも豊富</p>
            </div>
            <p class="text-contents">
              ハワイといえばビーチでマイタイ！コナブリューイングのハワイアンコナビールなどハワイでしか飲めないアルコールも豊富にあります。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img_aloha/13.jpg" />
              <p>ホテル創作料理</p>
            </div>
            <p class="text-contents">
              シェラトンワイキキ、ロイヤルハワイアン、モアナサーフライダー、アウラニに入っているレストランの創作料理も「ラクラクアロハ」なら気軽に注文できます。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="message-wrapper">
      <div class="container">
        <div class="heading">
          <h2>さぁ、今すぐALOHAの旅に出よう！</h2>
          <h3>Let's go on an Aloha trip!</h3>
        </div>
        <router-link to="/itemList" class="btn message">
          <span>ALOHAの旅に出る！</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Top extends Vue {}
</script>

<style scoped></style>
