import React, { FC, useEffect, useState } from "react";
import { OrderItem } from "../types/OrderItem";

type props = {
  orderItem: OrderItem;
};

export const CalcTotalPrice: FC<props> = (props) => {
  const { orderItem } = props;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(() => {
      //サイズがMの時の合計金額
      if (orderItem.size === "M") {
        const itemPrice = orderItem.item.priceM;
        let toppingPrice = 0;
        for (const orderTopping of orderItem.orderToppingList) {
          toppingPrice += orderTopping.Topping.priceM;
        }
        return (itemPrice + toppingPrice) * orderItem.quantity;
      }
      //サイズがLの時の合計金額
      if (orderItem.size === "L") {
        const itemPrice = orderItem.item.priceL;
        let toppingPrice = 0;
        for (const orderTopping of orderItem.orderToppingList) {
          toppingPrice += orderTopping.Topping.priceL;
        }
        return Number((itemPrice + toppingPrice) * orderItem.quantity);
      }
      return 0;
    });
  }, [orderItem]);

  return <div>{totalPrice}</div>;
};
