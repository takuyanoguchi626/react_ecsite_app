<template>
  <div>
    <div class="top-wrapper">
      <div class="background">
        <div class="container">
          <h1 class="page-title">{{ currentItem.name }}</h1>
          <div class="row">
            <div class="row item-detail">
              <div class="item-icon">
                <img v-bind:src="currentItem.imagePath" />
              </div>
              <div class="item-intro">{{ currentItem.description }}</div>
            </div>
            <div class="row item-size">
              <div class="item-hedding">サイズ</div>
              <div>
                <label>
                  <input
                    id="size-m"
                    name="size"
                    type="radio"
                    value="M"
                    v-on:change="calcSubTotalPrice"
                    v-model="size"
                  />
                  <span>
                    &nbsp;<span class="price">Ｍ</span>&nbsp;&nbsp;{{
                      currentItem.formatPriceM
                    }}円(税抜)</span
                  >
                </label>
                <label>
                  <input
                    id="size-l"
                    name="size"
                    type="radio"
                    value="L"
                    v-on:change="calcSubTotalPrice"
                    v-model="size"
                  />
                  <span>
                    &nbsp;<span class="price">Ｌ</span>&nbsp;&nbsp;{{
                      currentItem.formatPriceL
                    }}円(税抜)</span
                  >
                </label>
              </div>
            </div>
            <div class="row item-toppings">
              <div class="item-hedding">
                トッピング：&nbsp;1つにつき
                <span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;200円(税抜)
                <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
              </div>
              <label
                class="item-topping"
                v-for="topping of currentItem.toppingList"
                v-bind:key="topping.id"
              >
                <input
                  type="checkbox"
                  v-on:change="calcSubTotalPrice"
                  v-bind:value="topping"
                  v-model="checkedToppingList"
                />
                <span>{{ topping.name }}</span>
              </label>
            </div>
          </div>
          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select
                  class="browser-default"
                  v-model="quantity"
                  v-on:change="calcSubTotalPrice"
                >
                  <option value="" disabled selected>選択して下さい</option>
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
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row item-total-price">
            <span
              >この商品金額：{{
                itemSubTotalPrice.toLocaleString()
              }}円(税抜)</span
            >
          </div>
          <div class="row item-cart-btn">
            <button class="btn" type="button" v-on:click="putInCart">
              <span>カートに入れる</span>
            </button>
          </div>
          <div class="row item-cart-btn">
            <button class="btn" type="button" v-on:click="backToItemList">
              <span>商品一覧に戻る</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/types/Item";
import { Topping } from "@/types/Topping";
import axios from "axios";
@Component
export default class XXXComponent extends Vue {
  private currentItem = new Item(
    0,
    "",
    "",
    "",
    0,
    0,
    "",
    false,
    new Array<Topping>()
  );
  private checkedToppingList = Array<Topping>();
  private size = "M";
  private quantity = 1; // 初期値を１にしないと計算式が成り立たない
  private itemSubTotalPrice = 0;

  /**
   *WebAPIから１件の商品情報を取得する.
   *@returns Promiseオブジェクト
   */
  async created(): Promise<void> {
    try {
      // 商品を1件取得する
      const itemId = Number(this.$route.params.id);
      const responce = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/" + itemId
      );
      console.dir("responce:" + JSON.stringify(responce));
      let responceItem = responce.data.item;
      this.currentItem = new Item(
        responceItem.id,
        responceItem.type,
        responceItem.name,
        responceItem.description,
        responceItem.priceM,
        responceItem.priceL,
        responceItem.imagePath,
        responceItem.deleted,
        responceItem.toppingList
      );

      // トッピング一覧を取得する
      const responce2 = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/toppings/aloha"
      );
      console.dir("responce:" + JSON.stringify(responce2));
      // 空の配列を作成しToppingオブジェクトをpushする
      let toppingList = new Array<Topping>();
      for (const topping of responce2.data.toppings) {
        toppingList.push(
          new Topping(
            topping.id,
            topping.type,
            topping.name,
            topping.priceM,
            topping.priceL
          )
        );
      }
      this.currentItem.toppingList = toppingList;
      this.itemSubTotalPrice = responceItem.priceM;
    } catch (e) {
      console.log(e);
      this.$router.push("/404error");
      return;
    }
  }
  /**
   * 商品をカートに入れる(CartListに画面遷移する).
   */
  putInCart(): void {
    this.$store.commit("putInCart", {
      item: this.currentItem,
      topping: this.checkedToppingList,
      quantity: this.quantity,
      size: this.size,
    });
    this.$router.push("/cartList");
  }
  backToItemList(): void {
    this.$router.push("/itemList");
  }
  /**
   * 税抜き金額を計算する.
   */
  calcSubTotalPrice(): void {
    let toppingPrice = 0;
    let sizePrice = 0;
    if (this.size === "M") {
      sizePrice = this.currentItem.priceM;
    }
    if (this.size === "L") {
      sizePrice = this.currentItem.priceL;
    }
    for (let topping of this.checkedToppingList) {
      if (this.size === "M") {
        toppingPrice += topping.priceM;
      }
      if (this.size === "L") {
        toppingPrice += topping.priceL;
      }
    }
    this.itemSubTotalPrice = (toppingPrice + sizePrice) * this.quantity;
  }
}
</script>

<style scoped></style>
