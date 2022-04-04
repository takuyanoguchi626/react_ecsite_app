<template>
  <div class="top-wrapper">
    <div class="name">{{ userLoginInfo.name }}様のご注文履歴</div>
    <table border="2">
      <tr>
        <th>注文日</th>
        <th>商品名</th>
        <th>サイズ、価格（税抜）、数量</th>
        <th>トッピング、価格（税抜）</th>
        <th>合計</th>
      </tr>
      <tr v-for="order of orderHistory" v-bind:key="order.id">
        <td class="order-history">
          {{ order.orderDate }}
        </td>
        <td class="order-history">
          <div
            v-for="orderItem of order.orderItemList"
            v-bind:key="orderItem.id"
          >
            <div>
              <img v-bind:src="orderItem.item.imagePath" />
            </div>
            <div>
              {{ orderItem.item.name }}
            </div>
          </div>
        </td>
        <td class="order-history">
          <div
            v-for="orderItem of order.orderItemList"
            v-bind:key="orderItem.id"
          >
            <span class="price">{{ orderItem.size }}</span>
            <span v-if="orderItem.size === 'M'"
              >{{ orderItem.item.priceM.toLocaleString() }}円</span
            >
            <span v-if="orderItem.size === 'L'"
              >{{ orderItem.item.priceL.toLocaleString() }}円</span
            >
            {{ orderItem.quantity }}個
          </div>
        </td>
        <td class="order-history">
          <div
            v-for="orderItem of order.orderItemList"
            v-bind:key="orderItem.id"
          >
            <div
              v-for="topping of orderItem.orderToppingList"
              v-bind:key="topping.id"
            >
              {{ topping.topping.name }}
              <span v-if="orderItem.size === 'M'"
                >{{ topping.topping.priceM }}円</span
              >
              <span v-if="orderItem.size === 'L'"
                >{{ topping.topping.priceL }}円</span
              >
            </div>
          </div>
        </td>
        <td class="order-history">{{ order.totalPrice.toLocaleString() }}円</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { Order } from "@/types/Order";
import { OrderItem } from "@/types/OrderItem";
import { OrderTopping } from "@/types/OrderTopping";

@Component
export default class XXXComponent extends Vue {
  // ユーザーID
  private userid = 0;
  // ユーザーログイン情報
  private userLoginInfo = this.$store.getters.getUserLoginInfo;
  // 注文履歴
  private orderHistory = new Array<Order>();

  /**
   * 注文履歴をWEBAPIから取得する.
   *
   * @returns- Promiseオブジェクト
   */
  async created(): Promise<void> {
    this.userid = this.userLoginInfo.id;
    console.dir(JSON.stringify(this.userLoginInfo));
    console.log(this.userid);
    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/order/orders/aloha/` + this.userid
    );
    console.dir("response:" + JSON.stringify(response));
    const responceOrder = response.data.orders;
    // for文開始
    for (const order of responceOrder) {
      this.orderHistory.push(
        new Order(
          order.id,
          order.userId,
          order.status,
          order.totalPrice,
          order.orderDate,
          order.destinationName,
          order.destinationEmail,
          order.destinationZipcode,
          order.destinationAddress,
          order.destinationTel,
          order.deliveryTime,
          order.paymentMethod,
          order.user,
          order.orderItemList
        )
      );
      let orderItemList = new Array<OrderItem>();
      for (const orderItem of order.orderItemList) {
        orderItemList.push(
          new OrderItem(
            orderItem.id,
            orderItem.itemId,
            orderItem.orderId,
            orderItem.quantity,
            orderItem.size,
            orderItem.item,
            orderItem.orderToppingList
          )
        );
        let orderToppingList = new Array<OrderTopping>();
        for (const orderTopping of orderItem.orderToppingList) {
          orderToppingList.push(
            new OrderTopping(
              orderTopping.id,
              orderTopping.toppingId,
              orderTopping.orderItemId,
              orderTopping.topping
            )
          );
          console.log(orderToppingList);
        }
      }
    }
  }
}
</script>

<style scoped>
.name {
  font-weight: bold;
  font-size: 20px;
}
th {
  text-align: center;
}
.order-history {
  text-align: center;
}
</style>
