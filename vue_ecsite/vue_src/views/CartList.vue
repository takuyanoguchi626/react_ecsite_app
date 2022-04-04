<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">ショッピングカート</h1>
      <!-- table -->
      <div class="row">
        <table class="striped">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="userOrderInfo.orderItemList.length === 0">
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
            </tr>
            <tr
              v-for="(orderItem, index) of userOrderInfo.orderItemList"
              :key="orderItem.id"
            >
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img :src="orderItem.item.imagePath" />
                </div>
                <span>{{ orderItem.item.name }}</span>
              </td>
              <td>
                <span class="price">&nbsp;{{ orderItem.size }}</span
                >&nbsp;&nbsp;<span v-if="orderItem.size === 'M'"
                  >{{ orderItem.item.priceM.toLocaleString() }}円</span
                >
                <span v-if="orderItem.size === 'L'"
                  >{{ orderItem.item.priceL.toLocaleString() }}円</span
                >
                &nbsp;&nbsp;{{ orderItem.quantity }}個
              </td>
              <td>
                <ul>
                  <li
                    v-for="OrderTopping of orderItem.orderToppingList"
                    :key="OrderTopping.id"
                  >
                    {{ OrderTopping.topping.name }}
                    <span v-if="orderItem.size === 'M'">{{
                      OrderTopping.topping.priceM
                    }}</span>
                    <span v-if="orderItem.size === 'L'">{{
                      OrderTopping.topping.priceL
                    }}</span
                    >円
                  </li>
                </ul>
              </td>
              <td>
                <div class="text-center">
                  {{ orderItem.getCalcSubTotalPrice().toLocaleString() }}円
                </div>
              </td>
              <td>
                <button
                  class="btn"
                  type="button"
                  @click="deleteCartItem(index)"
                >
                  <span>削除</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row cart-total-price">
        <h1 class="page-title" v-if="userOrderInfo.orderItemList.length === 0">
          カートの中に商品がありません
        </h1>
        <div v-if="userOrderInfo.orderItemList.length !== 0">
          消費税：{{ userOrderInfo.tax.toLocaleString() }}円
        </div>
        <div v-if="userOrderInfo.orderItemList.length !== 0">
          ご注文金額合計：{{ userOrderInfo.calcTotalPrice.toLocaleString() }}円
          (税込)
        </div>
      </div>
      <div class="row order-confirm-btn">
        <button
          v-if="userOrderInfo.orderItemList.length !== 0"
          class="btn"
          type="button"
          @click="putInCart"
        >
          <span>注文に進む</span>
        </button>
      </div>
      <div class="row order-confirm-btn">
        <button class="btn" type="button" @click="backToItemList">
          <span>買い物を続ける</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Order } from "@/types/Order";
import { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
@Component
export default class XXXComponent extends Vue {
  //注文
  private userOrderInfo = new Order(
    0,
    0,
    0,
    0,
    new Date(),
    "",
    "",
    "",
    "",
    "",
    new Date(),
    0,
    new User(0, "", "", "", "", "", ""),
    new Array<OrderItem>()
  );
  /**
   * ストアの注文情報を取得し、userOrderInfoに代入.
   *
   */
  created(): void {
    const userOrderInfo = this.$store.getters.getUserOrderInfo;
    this.userOrderInfo = userOrderInfo;
  }
  /**
   * 注文商品を1品削除する.
   *
   * @params cartItemIndex - 注文商品番号
   */
  deleteCartItem(cartItemIndex: number): void {
    this.$store.commit("deleteCartItem", {
      index: cartItemIndex,
    });
  }
  /**
   * おすすめ画面へ遷移する.
   *
   */
  putInCart(): void {
    this.$router.push("/recommendation");
  }
  /**
   * 商品一覧画面に戻る.
   *
   */
  backToItemList(): void {
    this.$router.push("/itemList");
  }
}
</script>

<style scoped></style>
