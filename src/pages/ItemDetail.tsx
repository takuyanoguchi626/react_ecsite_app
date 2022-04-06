import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/itemDetail.css";
import { Item } from "../types/Item";
import { Topping } from "../types/Topping";

import { useContext } from "react";
import { cartListContext } from "../components/providers/CartListProvider";

export const ItemDetail = () => {
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

  const [toppingList, setToppingList] = useState<Array<Topping>>();

  const { itemId } = useParams();

  const [size, setSize] = useState(true);

  const changeSize = () => {
    setSize(!size);
  };

  const navigate = useNavigate();

  const cart = useContext(cartListContext);

  const pushInCartList = () => {
    cart?.setCartList([...cart.cartList, item]);
    navigate("/CartList/");
  };

  useEffect(() => {
    axios
      .get("http://153.127.48.168:8080/ecsite-api/item/" + itemId)
      .then((res) => {
        console.log(res.data.item);
        setItem(res.data.item);
        setToppingList(res.data.item.toppingList);
      });
  }, [itemId]);

  return (
    <div>
      <h1>{item?.name}</h1>
      <img className="itemImage" src={item?.imagePath} alt="" />
      <p>{item?.description}</p>
      <input
        id="M"
        name="size"
        type="radio"
        checked={size}
        onChange={changeSize}
      />
      <label htmlFor="M"> M {item?.priceM}円</label>
      <input
        id="L"
        name="size"
        type="radio"
        checked={!size}
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
      <select name="quantity" id="">
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
