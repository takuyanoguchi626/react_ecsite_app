<template>
  <div>
    <div>
      <div class="top-wrapper">
        <div class="last_background">
          <div class="container">
            <h1 class="page-title">決済が完了しました！</h1>
            <div class="order-finished-thanks-message">
              <p>この度はご注文ありがとうございます。</p>
              <p>
                お支払い先は、お送りしたメールに記載してありますのでご確認ください。
              </p>
              <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
            </div>
            <div class="row order-finished-btn">
              <button class="btn" type="button" @click="moveToTop">
                <span>トップ画面を表示する</span>
              </button>
            </div>
          </div>
          <!-- end container -->
        </div>
      </div>
      <!-- end top-wrapper -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  moveToTop(): void {
    this.$router.push("/top");
  }
}
</script>

<style scoped></style>
