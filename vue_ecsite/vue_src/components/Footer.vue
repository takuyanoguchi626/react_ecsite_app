<template>
  <footer>
    <div class="container">
      <img src="/img_aloha/header_logo.png" />
      <p>アロハな気分をあなたにお届け！</p>
      <div class="scroll">
        <a href="#" id="page-top"
          ><i class="blogicon-chevron-up"></i>ページ上部へ戻る</a
        >
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Footer extends Vue {}
</script>

<style scoped></style>
