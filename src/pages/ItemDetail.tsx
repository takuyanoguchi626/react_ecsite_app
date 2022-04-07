import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/itemDetail.css";
import { Item } from "../types/Item";
import { Topping } from "../types/Topping";

import { useContext } from "react";
import { cartListContext } from "../components/providers/CartListProvider";
import { OrderItem } from "../types/OrderItem";

export const ItemDetail = () => {
  //画面遷移のメソッド化
  const navigate = useNavigate();
  //URLのパラメータを取得
  const { itemId } = useParams();

  useEffect(() => {
    axios
      .get("http://153.127.48.168:8080/ecsite-api/item/" + itemId)
      .then((res) => {
        setItem(res.data.item);
        setToppingList(res.data.item.toppingList);
      });
  }, [itemId]);

  //商品
  const [item, setItem] = useState<Item>({
    deleted: false,
    description: "初期値",
    id: 0,
    imagePath: "",
    name: "初期値",
    priceL: 0,
    priceM: 0,
    toppingList: [],
    type: "",
  });

  //商品のサイズ
  const [size, setSize] = useState<string>("M");
  //商品のサイズの選択
  const [hasSize, setHasSize] = useState(true);
  //商品のサイズのradioButtonのチェンジメソッド
  const changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSize(!hasSize);
    setSize(() => e.target.value);
    console.log(size);
  };

  //商品のトッピング一覧
  const [toppingList, setToppingList] = useState<Array<Topping>>();

  //商品の量
  const [quantity, setQuantity] = useState<number>(100);

  //ショッピングカート
  const cart = useContext(cartListContext);

  //カートに商品を入れる
  const pushInCartList = () => {
    const orderItem: OrderItem = {
      id: 1, //仮
      itemId: item.id,
      orderId: 1, //仮）オーダーのステートを作成し、そのIDを取ってくる
      quantity: quantity,
      size: size,
      item: item,
      orderToppingList: [],
    };
    cart?.setCartList([...cart.cartList, orderItem]);
    navigate("/CartList/");
  };

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
      <div>トッピング： 1つにつき Ｍ 200円(税抜) Ｌ 300円(税抜)</div>
      {toppingList?.map((topping, index) => {
        return (
          <label key={index}>
            <input type="checkbox" />
            <span>{topping.name}</span>
          </label>
        );
      })}

      <div>数量</div>
      <select
        name="quantity"
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

      <div>この商品金額：3800円（税抜）</div>
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
