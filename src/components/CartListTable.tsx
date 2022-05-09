import { Button } from "@material-ui/core";
import React, { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderItem } from "../types/OrderItem";
import { CalcTotalPrice } from "./CalcTotalPrice";
import { OrderItemSize } from "./OrderItemSize";
import { cartListContext } from "./providers/CartListProvider";
import { EditContext } from "./providers/EditProvider";

type props = {
  hasButton: boolean;
};

export const CartListTable: FC<props> = (props) => {
  const navigate = useNavigate();
  //削除、編集ボタンを表示するかのflag
  const { hasButton } = props;
  //ショッピングカートの商品を取得
  const cart = useContext(cartListContext);
  if (!cart) {
    throw new Error("");
  }
  const cartList = cart.cartList;
  //商品を削除する
  const deleteCartItem = (index: number) => {
    const result = window.confirm(
      `本当に「${cartList[index].item.name}」をカートから削除してよろしいですか？`
    );
    if (result) {
      cart?.setCartList((cartList) => {
        const cartList2 = [...cartList];
        cartList2?.splice(index, 1);
        return cartList2;
      });
    }
  };
  //編集する商品を格納するcontextを取得
  const editOrderItem = useContext(EditContext);

  const edit = (orderItem: OrderItem, index: number) => {
    editOrderItem?.setEditOrderItem(orderItem);
    editOrderItem?.setIndex(index);
    navigate("/EditCartItem/");
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
                        <Button
                          className="pushInCartList"
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={() => {
                            edit(orderItem, index);
                          }}
                        >
                          編集
                        </Button>
                        <Button
                          className="pushInCartList"
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={() => {
                            deleteCartItem(index);
                          }}
                        >
                          削除
                        </Button>
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
