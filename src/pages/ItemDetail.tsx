import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/itemDetail.css";
import { Item } from "../types/item";
import { Topping } from "../types/topping";

export const ItemDetail = () => {
  const [item, setItem] = useState<Item>();

  const [toppingList, setToppingList] = useState<Array<Topping>>();

  const { itemId } = useParams();

  const navigate = useNavigate();

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
      <input id="M" name="size" type="radio" checked />
      <label htmlFor="M"> M {item?.priceM}円</label>
      <input id="L" name="size" type="radio" />
      <label htmlFor="L">L {item?.priceL}円</label>
      <div>トッピング： 1つにつき Ｍ 200円(税抜) Ｌ 300円(税抜)</div>
      {toppingList?.map((topping) => {
        return (
          <label>
            <input type="checkbox" />
            <span>{topping.name}</span>
          </label>
        );
      })}
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
