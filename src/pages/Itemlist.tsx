import axios from "axios";
import React, { useState, useEffect } from "react";
import { Item } from "../types/Item";
import { Link } from "react-router-dom";

export const ItemList = () => {
  const ItemListUrl = "http://153.127.48.168:8080/ecsite-api/item/items/pizza";
  // itemListというstate名で、メソッド名をsetItemListとし、useStateを使用して初期値を設定する。
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // axios呼び出し
    axios.get(ItemListUrl).then((response) => {
      // itemListにreponsedataをセットする
      setItemList(() => response.data.items);
    });
  }, []);

  // 表示
  return (
    <div>
      <h1>Itemlist</h1>
      <div>
        <input type="text" />
        <button type="button">検索</button>
      </div>
      {/* mapで一覧表示させる */}
      {itemList.map((item: Item) => {
        return (
          <div className="itemLists">
            <div>
              <Link to={"/ItemDetail/" + `${item.id}`}>
                <img src={`${item.imagePath}`} alt="images" />
              </Link>
            </div>
            <p>{item.name}</p>
            <p>{item.priceM}</p>
            <p>{item.priceL}</p>
            {/* end of itemList */}
          </div>
        );
      })}
    </div>
  );
};
