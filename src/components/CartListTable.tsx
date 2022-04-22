import React, { FC, useContext } from "react";
import { Item } from "../types/Item";
import { CalcTotalPrice } from "./CalcTotalPrice";
import { OrderItemSize } from "./OrderItemSize";
import { cartListContext } from "./providers/CartListProvider";

type props = {
  hasButton: boolean;
};

export const CartListTable: FC<props> = (props) => {
  const { hasButton } = props;

  const cart = useContext(cartListContext);
  const cartList = cart?.cartList;

  const deleteCartItem = (index: number) => {
    cart?.setCartList((cartList) => {
      const cartList2 = [...cartList];
      cartList2?.splice(index, 1);
      return cartList2;
    });
  };

  return (
    <div>
      <table style={{ border: "solid black" }}>
        <thead>
          <tr>
            <th>商品名</th>
            <th>サイズ、価格(税抜)、数量</th>
            <th>トッピング、価格(税抜)</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          {cartList?.map((orderItem, index) => (
            <tr key={index}>
              <td>
                <div>
                  <img src={orderItem.item.imagePath} alt="" />
                </div>
                <span>{orderItem.item.name}</span>
              </td>
              <td>
                {orderItem.size}
                <OrderItemSize
                  orderItemSize={orderItem.size}
                  priceM={orderItem.item.priceM}
                  priceL={orderItem.item.priceL}
                ></OrderItemSize>
                &nbsp;&nbsp;{orderItem.quantity}個
              </td>
              <td>
                <ul>
                  {/* まだトッピングリストは取得してない */}
                  {orderItem.orderToppingList.map((orderTopping) => (
                    <li>
                      {orderTopping.Topping.name}
                      <OrderItemSize
                        orderItemSize={orderItem.size}
                        priceM={orderTopping.Topping.priceM}
                        priceL={orderTopping.Topping.priceL}
                      ></OrderItemSize>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div>
                  <CalcTotalPrice orderItem={orderItem}></CalcTotalPrice>円
                </div>
              </td>
              <td>
                {(() => {
                  if (hasButton) {
                    return (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            deleteCartItem(index);
                          }}
                        >
                          <span>削除</span>
                        </button>
                        <button type="button">
                          <span>編集</span>
                        </button>
                      </>
                    );
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
