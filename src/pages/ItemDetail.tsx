import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "../types/Item";
import { Topping } from "../types/Topping";
import { cartListContext } from "../components/providers/CartListProvider";
import { OrderItem } from "../types/OrderItem";
import { OrderTopping } from "../types/OrderTopping";
import { orderContext } from "../components/providers/OrderProvider";

export const ItemDetail = () => {
  // routerからitemidを取得する
  const { itemId } = useParams();
  //APIから商品詳細の情報を取得
  useEffect(() => {
    axios
      .get("http://153.127.48.168:8080/ecsite-api/item/" + itemId)
      .then((response) => {
        setItem(response.data.item);
        setToppingList(response.data.item.toppingList);
      });
  }, [itemId]);

  // 商品情報
  const [item, setItem] = useState<Item>({
    deleted: false,
    description: "",
    id: 0,
    imagePath: "",
    name: "",
    priceL: 0,
    priceM: 0,
    toppingList: [],
    type: "",
  });
  //商品のトッピング一覧
  const [toppingList, setToppingList] = useState<Array<Topping>>();

  // サイズの初期値
  const [size, setSize] = useState<string>("M");
  // サイズ選択
  const [hasSize, setHasSize] = useState(true);
  //チェックボックス変更するメソッド
  const changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSize(!hasSize);
    setSize(() => e.target.value);
  };

  // チェックしたトッピングのリスト
  const [selectedToppingIdList, setselectedToppingIdList] = useState<
    Array<number>
  >([]);

  // トッピングを選択、選択解除した際にトッピングIDを格納、削除する
  const getSelectedTopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      const toppingId: number = Number(event.target.value);
      const selectedToppingIdList2 = selectedToppingIdList;
      selectedToppingIdList2.push(toppingId);
      setselectedToppingIdList(() => selectedToppingIdList2);
    } else {
      const selectedToppingIdList2 = selectedToppingIdList;
      for (let i = 0; i < selectedToppingIdList2.length; i++) {
        if (selectedToppingIdList2[i] === Number(event.target.value)) {
          selectedToppingIdList2.splice(i, 1);
        }
      }
      setselectedToppingIdList(() => selectedToppingIdList2);
    }
    console.log("トッピングを選択" + selectedToppingIdList);
  };

  // 数量
  const [quantity, setQuantity] = useState<number>(1);

  //ショッピングカート
  const cart = useContext(cartListContext);
  // order情報
  const order = useContext(orderContext);

  // カートにいれる
  const pushInCartList = () => {
    //選択したトッピングのIDでトッピング一覧を絞り込み
    const filteredToppingList = item?.toppingList?.filter((topping) => {
      // 選択したトッピングの数繰り返す
      for (let checkedToppingId of selectedToppingIdList) {
        // APIのトッピングと同じだった場合
        if (topping.id === checkedToppingId) {
          return true;
        }
      }
      return false;
    });

    // カートにいれるためにOrderTopping型に変換したオーダートッピング一覧
    const newOrderToppingList = new Array<OrderTopping>();

    // 選択したトッピングごとに繰り返し、変換用の配列に格納する
    let orderToppingId = 0;
    for (let topping of filteredToppingList) {
      const orderTopping = topping;
      newOrderToppingList.push({
        id: orderToppingId,
        toppingId: orderTopping.id,
        orderItemId: item.id,
        Topping: orderTopping,
      });
      orderToppingId++;
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
  };

  //合計金額
  const totalPrices = () => {
    const selectedToppings = selectedToppingIdList.length;
    if (size === "M") {
      const toppingPrice = selectedToppings * 200;
      return (item.priceM + toppingPrice) * quantity;
    } else {
      const toppingPrice = selectedToppings * 300;
      return (item.priceL + toppingPrice) * quantity;
    }
  };

  //画面遷移のメソッド化
  const navigate = useNavigate();

  return (
    <div>
      <h1>{item?.name}</h1>
      <img className="itemImage" src={item?.imagePath} alt="test" />
      <p>{item?.description}</p>
      <input
        id="M"
        name="size"
        type="radio"
        value="M"
        checked={hasSize}
        onChange={changeSize}
      />
      <label htmlFor="M"> M {item?.priceM}円</label>
      <input
        id="L"
        name="size"
        type="radio"
        value="L"
        checked={!hasSize}
        onChange={changeSize}
      />
      <label htmlFor="L">L {item?.priceL}円</label>
      <div>トッピング： 1つにつき Ｍ 200円(税抜) Ｌ 300 円(税抜)</div>
      {toppingList?.map((topping, index) => {
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
