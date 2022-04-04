<template>
  <div class="itemList">
    <!-- search form -->
    <div class="search-wrapper">
      <div class="container">
        <div class="error">{{ searchItemMessage }}</div>
        <form method="post" class="search-form">
          <input
            id="searchItem"
            class="search-name-input"
            v-model="searchItemName"
            autocomplete="on"
            list="searchItemList"
          />
          <datalist id="searchItemList">
            <div v-for="item of searchItemList" :key="item.name">
              <option :value="item.name"></option>
            </div>
          </datalist>

          <label for="searchItem">
            <button
              class="btn search-btn"
              type="button"
              v-on:click="searchItems"
            >
              <span>検&nbsp;&nbsp;索</span>
            </button></label
          >
        </form>
      </div>
    </div>

    <!-- item list -->
    <div class="item-wrapper">
      <div class="container">
        <!-- ユーザーが商品を並び替える  -->
        <div class="sorting" v-if="shouldShowSorting">
          <select
            style="display: block"
            name="order"
            v-model="sorting"
            v-on:change="sortByUser"
          >
            <option value="" hidden>並び替え</option>
            <option value="name">五十音順</option>
            <option value="descPrice" v-on:change="sortByUser">
              値段が安い順
            </option>
            <option value="ascPrice" v-on:change="sortByUser">
              値段が高い順
            </option>
          </select>
        </div>
        <div class="category">
          <button
            class="btn-circle-stitch"
            type="button"
            v-on:click="getItemlistSortByCategory('all')"
          >
            All Item
          </button>
          <button
            class="btn-circle-stitch"
            type="button"
            v-on:click="getItemlistSortByCategory('main')"
          >
            Main Menu
          </button>
          <button
            class="btn-circle-stitch"
            type="button"
            v-on:click="getItemlistSortByCategory('side')"
          >
            Side Menu
          </button>
          <button
            class="btn-circle-stitch"
            type="button"
            v-on:click="getItemlistSortByCategory('desert')"
          >
            Dessert
          </button>
          <button
            class="btn-circle-stitch"
            type="button"
            v-on:click="getItemlistSortByCategory('drink')"
          >
            Drink
          </button>
        </div>
        <div class="items">
          <div
            class="item"
            v-for="item of currentItemList"
            v-bind:key="item.id"
          >
            <div class="item-icon img-frame">
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
    <div class="sample"></div>
    <div class="button-wrapper" v-if="shouldShowPageButton">
      <button
        type="button"
        class="pageButton"
        v-for="pageNum of pageArray"
        v-bind:key="pageNum"
        v-on:click="createItemListForOnePage(pageNum)"
      >
        {{ pageNum }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/types/Item";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ItemList extends Vue {
  /**
   * 商品一覧を表示する画面.
   */
  //商品一覧
  private currentItemList: Array<Item> = [];
  // 検索文字列
  private searchItemName = "";
  // 検索文字列メッセージ
  private searchItemMessage = "";
  // １ページに表示される最大の商品の数
  private readonly MAX_ITEM_COUNT = 6;
  // 商品数
  private allItemCount = 0;
  //
  private searchItemList = Array<Item>();
  //五十音順の初期表示
  private sorting = "";
  //ページボタンを表示するかの真偽
  private shouldShowPageButton = true;
  //並べ替えを表示するかの真偽
  private shouldShowSorting = true;

  /**
   * Vuexストアのアクション経由非同期でWebAPIから商品情報一覧を取得する.
   * @remarks
   * Vueインスタンスが生成されたタイミングで
   * Vuexストア内のアクションを呼ぶ(ディスパッチする)。
   * ライフサイクルフックのcreatedイベント利用。
   */
  async created(): Promise<void> {
    await this.$store.dispatch("getItemList");
    //商品一覧情報と商品数をVuexストアから取得
    this.currentItemList = this.$store.getters.getItemList;
    this.allItemCount = this.$store.getters.getItemCount;
    this.createItemListForOnePage(1); //引数で1を渡してあげると1ページ目が表示される
    this.searchItemList = this.$store.getters.getItemList;
  }

  /**
   * 商品を検索をする.
   *
   * @remarks
   * Vuexストアから検索文字列に一致したものを絞り込んで出力する
   * １件も検索されなかった場合は「該当する商品がありません」
   * と出力して商品全件を表示する
   */
  searchItems(): void {
    //並べ替え欄とページボタンが非表示の場合に表示させる
    this.shouldShowPageButton = true;
    this.shouldShowSorting = true;
    // 入力された文字列で絞り込みを行う
    this.currentItemList = this.$store.getters.getSearchedItemList(
      this.searchItemName
    );
    //該当する値がない場合のエラーメッセージを初期化する
    this.searchItemMessage = "";
    // 該当する値がない場合は、エラーメッセージを出して全件検索を行う
    if (this.currentItemList.length === 0 || this.searchItemName === "") {
      this.createItemListForOnePage(1);
      this.searchItemMessage = "該当する商品がありません  ";
    }
  }

  /**
   * ページング機能.
   * @returns ページ数の配列
   */
  get pageArray(): Array<number> {
    let maxPageNum = Math.ceil(this.allItemCount / this.MAX_ITEM_COUNT);
    let pageArray = new Array<number>();
    for (let i = 1; i <= maxPageNum; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }
  /**
   * 対象ページに出力する商品一覧を作成する.
   * @param targetPageNum 表示させる対象ページ番号
   * @param targetList 切り出す元の商品一覧
   */
  private createItemListForOnePage(targetPageNum: number): void {
    this.searchItemMessage = "";
    let startNum = (targetPageNum - 1) * this.MAX_ITEM_COUNT;
    let endNum = startNum + this.MAX_ITEM_COUNT;
    this.currentItemList = this.$store.getters.getItemList.slice(
      startNum,
      endNum
    );
  }

  /**
   * ユーザーが商品を並び変える.
   */
  sortByUser(): void {
    this.searchItemMessage = "";
    //五十音順
    if (this.sorting === "name") {
      this.$store.commit("sortByName");
      this.currentItemList = this.$store.getters.getItemList;

      //料金低い順
    } else if (this.sorting === "descPrice") {
      this.$store.commit("sortByDescPrice");
      this.currentItemList = this.$store.getters.getItemList;
      //料金高い順
    } else if (this.sorting === "ascPrice") {
      this.$store.commit("sortByAscPrice");
      this.currentItemList = this.$store.getters.getItemList;
    }
  }
  //カテゴリーごとの商品一覧のIDの配列
  private mainItemIdList: Array<number> = [1, 3, 5, 9, 10, 15, 16, 18];
  private sideItemIdList: Array<number> = [2, 4, 7, 8, 17];
  private desertItemIdList: Array<number> = [6, 11, 13];
  private drinkItemIdList: Array<number> = [12, 14];
  /**
   * カテゴリーごとに表示
   */
  getItemlistSortByCategory(category: string): void {
    this.searchItemMessage = "";
    if (category === "all") {
      this.createItemListForOnePage(1);
      this.shouldShowPageButton = true;
      this.shouldShowSorting = true;
      return;
    }
    let itemIdList = Array<number>();
    if (category === "main") {
      itemIdList = this.mainItemIdList;
      this.shouldShowPageButton = false;
      this.shouldShowSorting = false;
    }
    if (category === "side") {
      itemIdList = this.sideItemIdList;
      this.shouldShowPageButton = false;
      this.shouldShowSorting = false;
    }
    if (category === "desert") {
      itemIdList = this.desertItemIdList;
      this.shouldShowPageButton = false;
      this.shouldShowSorting = false;
    }
    if (category === "drink") {
      itemIdList = this.drinkItemIdList;
      this.shouldShowPageButton = false;
      this.shouldShowSorting = false;
    }
    this.currentItemList =
      this.$store.getters.getItemlistSortByCategory(itemIdList);
  }
}
</script>

<style scoped></style>
