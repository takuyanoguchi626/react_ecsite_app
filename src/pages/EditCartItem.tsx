import axios from "axios";
import React, { useState, useEffect, useContext, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "../types/Item";
import { Topping } from "../types/Topping";
import { cartListContext } from "../components/providers/CartListProvider";
import { OrderItem } from "../types/OrderItem";
import { OrderTopping } from "../types/OrderTopping";
import { orderContext } from "../components/providers/OrderProvider";
import { Order } from "../types/Order";
import { EditContext } from "../components/providers/EditProvider";

export const EditCartItem = () => {
  //画面遷移のメソッド化
  const navigate = useNavigate();

  //編集するオーダー商品を取得
  const editOrderItem = useContext(EditContext);
  const orderItem = editOrderItem?.editOrderItem;
  console.log(orderItem);

  // サイズの初期値
  const [size, setSize] = useState<string>();
  //編集する商品のサイズを初期値に設定
  useEffect(() => {
    setSize(orderItem?.size);
  }, []);
  // サイズ選択
  const [hasSize, setHasSize] = useState(true);
  //デフォルトのサイズ表示を設定
  useEffect(() => {
    if (orderItem?.size === "L") {
      setHasSize(!hasSize);
    }
  }, []);
  //チェックボックス変更するメソッド
  const changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSize(!hasSize);
    setSize(() => e.target.value);
  };

  // チェックしたトッピングのIDリスト
  const [selectedToppingIdList, setselectedToppingIdList] = useState<
    Array<number>
  >([]);
  //トッピングIDリストを編集するもののIDリストに置き換える
  useEffect(() => {
    const idArr = new Array<number>();
    if (orderItem !== undefined) {
      for (const orderTopping of orderItem?.orderToppingList) {
        idArr.push(orderTopping.Topping.id);
      }
    }
    setselectedToppingIdList(idArr);
  }, []);

  // トッピングを取得する
  const getSelectedTopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);

    if (event.target.checked === true) {
      const toppingId: number = Number(event.target.value);
      // トッピングをリストに収納
      setselectedToppingIdList((selectedToppingIdList) => {
        return [
          // 配列を分解する
          ...selectedToppingIdList,
          // 新しい配列を作る
          toppingId,
        ];
      });
    } else {
      setselectedToppingIdList((selectedToppingIdList) => {
        const selectedToppingIdList2 = selectedToppingIdList;
        for (let i = 0; i < selectedToppingIdList2.length; i++) {
          if (selectedToppingIdList2[i] === Number(event.target.value)) {
            selectedToppingIdList2.splice(i, 1);
          }
        }
        return selectedToppingIdList2;
      });
    }
    console.log("トッピングを選択" + selectedToppingIdList);
  };

  // 数量
  const [quantity, setQuantity] = useState<number>(1);
  //数量を編集するものの数量に置き換える
  useEffect(() => {
    if (orderItem !== undefined) {
      setQuantity(orderItem?.quantity);
    }
  }, []);

  //ショッピングカート
  const cart = useContext(cartListContext);
  // order情報
  const order = useContext(orderContext);
  // order情報格納用の配列
  const orderItemInfo = new Array<OrderItem>();

  // カートにいれる
  const pushInCartList = () => {
    // トッピングリストをチェックしたもののみに絞り込み
    const filteredToppingList = orderItem?.item.toppingList?.filter(
      (topping) => {
        // 選択したトッピングの数繰り返す
        for (let checkedToppingId of selectedToppingIdList) {
          // APIのトッピングと同じだった場合
          if (topping.id === checkedToppingId) {
            return true;
          }
        }
        return false;
      }
    );

    // カートにいれるためにOrderTopping型に変換する
    const newOrderToppingList = new Array<OrderTopping>();

    // 選択したトッピングごとに繰り返し、変換用の配列に格納する
    // //idの採番
    let orderToppingId = 0;
    if (filteredToppingList !== undefined && orderItem !== undefined) {
      for (let orderedToppings of filteredToppingList) {
        const orderTopping = orderedToppings;
        newOrderToppingList.push({
          id: orderToppingId,
          toppingId: orderTopping.id,
          orderItemId: orderItem.id,
          Topping: orderTopping,
        });
        orderToppingId++;
      }
    }

    // カートに商品を入れる
    if (
      orderItem !== undefined &&
      order?.orderInfo !== undefined &&
      size !== undefined &&
      editOrderItem?.index !== undefined
    ) {
      const orderItem2: OrderItem = {
        id: orderItem?.id,
        itemId: orderItem.item.id,
        orderId: order?.orderInfo?.id, //仮）オーダーのステートを作成し、そのIDを取ってくる
        quantity: quantity,
        size: size,
        item: orderItem.item,
        orderToppingList: newOrderToppingList,
      };
      cart?.setCartList((cartList) => {
        return cartList.splice(editOrderItem?.index, 1, orderItem2);
      });
      navigate("/CartList/");
    }
  };

  //合計金額
  //   const totalPrices = () => {
  //     const selectedToppings = selectedToppingIdList.length;
  //     if (size === "M") {
  //       const toppingPrice = selectedToppings * 200;
  //       return (orderItem.item.priceM + toppingPrice) * quantity;
  //     } else {
  //       const toppingPrice = selectedToppings * 300;
  //       return (orderItem.item.priceL + toppingPrice) * quantity;
  //     }
  //   };

  return (
    <div>
      <h1>{orderItem?.item?.name}</h1>
      <img className="itemImage" src={orderItem?.item?.imagePath} alt="test" />
      <p>{orderItem?.item?.description}</p>
      <input
        id="M"
        name="size"
        type="radio"
        value="M"
        checked={hasSize}
        onChange={changeSize}
      />
      <label htmlFor="M"> M {orderItem?.item?.priceM}円</label>
      <input
        id="L"
        name="size"
        type="radio"
        value="L"
        checked={!hasSize}
        onChange={changeSize}
      />
      <label htmlFor="L">L {orderItem?.item?.priceL}円</label>
      <div>トッピング： 1つにつき Ｍ 200円(税抜) Ｌ 300 円(税抜)</div>
      {orderItem?.item.toppingList?.map((topping, index) => {
        let checked = false;
        for (const topping2 of orderItem.orderToppingList) {
          if (topping2.Topping.id === topping.id) {
            checked = true;
          }
        }
        return (
          <div>
            <label key={index}>
              <input
                type="checkbox"
                // チェックが入った値を取得
                onChange={getSelectedTopping}
                value={topping.id}
              />
              <span>{topping.name}</span>
            </label>
          </div>
        );
      })}
      <div>
        ; 数量
        <select
          className="quantity"
          name="quantity"
          id="pizzaQuantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
          defaultValue={Number(orderItem?.quantity)}
        >
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
      <div>この商品金額：{0}円（税抜）</div>
      <div>
        <button
          onClick={() => {
            pushInCartList();
          }}
        >
          カートに入れる
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/itemList/");
          }}
        >
          商品一覧に戻る
        </button>
      </div>
    </div>
  );
};
