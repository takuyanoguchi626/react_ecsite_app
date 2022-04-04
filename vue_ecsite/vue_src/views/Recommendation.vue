<template>
  <div class="top-wrapper">
    <div class="itemList">
      <div>
        <h1 class="page-title">ご一緒にこちらの商品もいかがですか？</h1>
      </div>
      <!-- item list -->
      <div class="item-wrapper">
        <div class="container">
          <div class="items">
            <div
              class="item"
              v-for="item of recommendationItemList"
              v-bind:key="item.id"
            >
              <div class="item-icon">
                <router-link :to="'/itemDetail/' + item.id">
                  <img v-bind:src="item.imagePath" />
                </router-link>
              </div>

              <router-link :to="'/itemDetail/' + item.id">
                <span>{{ item.name }}</span
                ><br />
              </router-link>
              <span class="price">Ｍ</span>
              {{ item.formatPriceM }}円(税抜)<br />
              <span class="price">Ｌ</span>{{ item.formatPriceL }}円(税抜)<br />
            </div>
          </div>
        </div>
      </div>
      <div class="row order-confirm-btn">
        <button class="btn" type="button" @click="putInCart">
          いいえ結構です。
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/types/Item";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ItemList extends Vue {
  //商品一覧
  private currentItemList: Array<Item> = [];
  //おすすめする商品一覧
  private recommendationItemList = Array<Item>();
  //サイドメニューのID
  private sideMenuItemId = [4, 6, 7, 10, 11, 12, 13, 14, 17];
  //サイドメニューの一覧
  private sideMenuItemList = Array<Item>();

  /**
   * Vuexストアのアクション経由非同期でWebAPIから商品情報一覧を取得する.
   * @remarks
   * Vueインスタンスが生成されたタイミングで
   * Vuexストア内のアクションを呼ぶ(ディスパッチする)。
   * ライフサイクルフックのcreatedイベント利用。
   */
  async created(): Promise<void> {
    //ログインしていなかったらログイン画面へ遷移
    if (this.$store.getters.getLogStatus === false) {
      this.$router.push("/backToLogin");
      return;
    }

    await this.$store.dispatch("getItemList");

    //商品一覧情報をVuexストアから取得
    this.currentItemList = this.$store.getters.getItemList;

    //サイドメニュー一覧に商品を入れる
    for (let id of this.sideMenuItemId) {
      let item = this.currentItemList.find((item) => item.id === id);
      if (item !== undefined) {
        this.sideMenuItemList.push(item);
      }
    }
    //表示するおすすめ商品一覧にランダムで３つサイドメニュー一覧から入れる
    for (let i = 1; this.recommendationItemList.length < 3; i++) {
      let pushItem =
        this.sideMenuItemList[
          Math.floor(Math.random() * this.sideMenuItemList.length)
        ];
      if (
        this.recommendationItemList.find((item) => item.id === pushItem.id) ===
        undefined
      ) {
        this.recommendationItemList.push(pushItem);
      }
    }
  }

  /**
   * 注文確認画面へ画面遷移する.
   *
   */
  putInCart(): void {
    this.$router.push("/orderConfirm");
  }
}
</script>

<style scoped>
.item-wrapper {
  padding-top: 0px;
}
</style>
