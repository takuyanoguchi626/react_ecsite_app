import React, { useContext } from "react";
import { cartListContext } from "../components/providers/CartListProvider";

export const useTotalPrice = () => {
  const cart = useContext(cartListContext);
  let totalPrice = 0;

  if (cart?.cartList !== undefined) {
    for (const orderItem of cart?.cartList) {
      //サイズがMの時の合計金額
      if (orderItem.size === "M") {
        const itemPrice = orderItem.item.priceM;
        let toppingPrice = 0;
        for (const orderTopping of orderItem.orderToppingList) {
          toppingPrice += orderTopping.Topping.priceM;
        }
        totalPrice += (itemPrice + toppingPrice) * orderItem.quantity;
      }
      //サイズがLの時の合計金額
      if (orderItem.size === "L") {
        const itemPrice = orderItem.item.priceL;
        let toppingPrice = 0;
        for (const orderTopping of orderItem.orderToppingList) {
          toppingPrice += orderTopping.Topping.priceL;
        }
        totalPrice += Number((itemPrice + toppingPrice) * orderItem.quantity);
      }
    }
  }

  const TAXRate = 0.1;
  const TAXOfTotalPrice = totalPrice * TAXRate;
  const finallyTotalPrice = totalPrice + TAXOfTotalPrice;

  return { totalPrice, TAXOfTotalPrice, finallyTotalPrice };
};
