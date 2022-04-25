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

type props = {
  orderItem: OrderItem;
};

export const EditCartItem: FC<props> = (props) => {
  //画面遷移のメソッド化
  const navigate = useNavigate();

  const { orderItem } = props;

  // サイズの初期値
  const [size, setSize] = useState<string>(orderItem.size);
  // サイズ選択
  const [hasSize, setHasSize] = useState(true);
  //チェックボックス変更するメソッド
  const changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSize(!hasSize);
    setSize(() => e.target.value);
  };
  //デフォルトのサイズ表示を設定
  useEffect(() => {
    if (orderItem.size === "L") {
      setHasSize(!hasSize);
    }
  }, []);

  // チェックしたトッピングのリスト
  const [selectedToppingIdList, setselectedToppingIdList] = useState<
    Array<number>
  >([]);

  // トッピングを取得する
  const getSelectedTopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      const toppingId: number = Number(event.target.value);
      // トッピングをリストに収納
      setselectedToppingIdList((selectedToppingIdList) => [
        // 配列を分解する
        ...selectedToppingIdList,
        // 新しい配列を作る
        toppingId,
      ]);
    } else {
      setselectedToppingIdList((selectedToppingIdList) => {});
    }
  };

  // 数量
  const [quantity, setQuantity] = useState<number>(1);

  //ショッピングカート
  const cart = useContext(cartListContext);
  // order情報
  const order = useContext(orderContext);
  // order情報格納用の配列
  const orderItemInfo = new Array<OrderItem>();

  // カートにいれる
  const pushInCartList = () => {
    // 結果を格納する配列
    const filteredToppingList = new Array<Topping>();
    // 最初の謎の空白行を消す
    filteredToppingList.splice(0);
    // APIのtoppingListをフィルター
    toppingList?.filter((topping) => {
      // 選択したトッピングの数繰り返す
      for (let checkedToppingId of selectedToppingIdList) {
        // APIのトッピングと同じだった場合
        if (topping.id === checkedToppingId) {
          // 格納用の配列に格納する
          filteredToppingList.push(topping);
          return true;
        }
      }
    });

    // カートにいれるためにOrderTopping型に変換する
    const newOrderToppingList = new Array<OrderTopping>();

    // 選択したトッピングごとに繰り返し、変換用の配列に格納する
    // //idの採番
    let orderToppingId = 0;
    for (let orderedToppings of filteredToppingList) {
      const orderTopping = orderedToppings;
      orderToppingId++;
      newOrderToppingList.push({
        id: orderToppingId,
        toppingId: orderTopping.id,
        orderItemId: item.id,
        Topping: orderTopping,
      });
    }

    // カートに商品を入れる
    let orderItemId = 0;
    orderItemId++;
    const orderItem: OrderItem = {
      id: orderItemId,
      itemId: item.id,
      orderId: 0, //仮）オーダーのステートを作成し、そのIDを取ってくる
      quantity: quantity,
      size: size,
      item: item,
      orderToppingList: newOrderToppingList,
    };
    cart?.setCartList([...cart.cartList, orderItem]);
    navigate("/CartList/");
    orderItemInfo.push(orderItem);

    // OrderProviderに送信
    const formattedOrderItem: Order = {
      id: 1,
      userId: 1,
      status: 1,
      totalPrice: totalPrices(),
      orderDate: new Date(),
      distinationName: "",
      distinationEmail: "",
      distinationZipcode: "",
      distinationAddress: "",
      distinationTel: "",
      deliveryTime: new Date(),
      paymentMethod: 1,
      user: {
        id: 1,
        name: "",
        mailAddress: "",
        password: "",
        zipcode: "",
        address: "",
        telephone: "",
      },
      orderItemList: orderItemInfo,
    };
    order?.setOrderInfo([...order.orderInfo, formattedOrderItem]);
  };

  //合計金額
  const totalPrices = () => {
    const selectedToppings = selectedToppingIdList.length;
    if (size === "M") {
      const toppingPrice = selectedToppings * 200;
      return (orderItem.item.priceM + toppingPrice) * quantity;
    } else {
      const toppingPrice = selectedToppings * 300;
      return (orderItem.item.priceL + toppingPrice) * quantity;
    }
  };

  return (
    <div>
      <h1>{orderItem.item?.name}</h1>
      <img className="itemImage" src={orderItem.item?.imagePath} alt="test" />
      <p>{orderItem.item?.description}</p>
      <input
        id="M"
        name="size"
        type="radio"
        value="M"
        checked={hasSize}
        onChange={changeSize}
      />
      <label htmlFor="M"> M {orderItem.item?.priceM}円</label>
      <input
        id="L"
        name="size"
        type="radio"
        value="L"
        checked={!hasSize}
        onChange={changeSize}
      />
      <label htmlFor="L">L {orderItem.item?.priceL}円</label>
      <div>トッピング： 1つにつき Ｍ 200円(税抜) Ｌ 300 円(税抜)</div>
      {orderItem.item.toppingList?.map((topping, index) => {
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
          defaultValue="1"
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
      <div>この商品金額：{totalPrices()}円（税抜）</div>
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
