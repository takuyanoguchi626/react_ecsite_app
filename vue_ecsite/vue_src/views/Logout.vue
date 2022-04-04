<template>
  <div class="container">ログアウト中・・・</div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Logout extends Vue {
  /**
   * ログアウトする.
   */
  async created(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/logout"
    );
    console.dir("response:" + JSON.stringify(response));
    // ログアウト状態にする(mutationsのlogoutを呼ぶ)
    this.$store.commit("logout");
    console.log("call");
    // 商品一覧画面に遷移する
    this.$router.push("/itemList");
  }
}
</script>

<style scoped></style>
