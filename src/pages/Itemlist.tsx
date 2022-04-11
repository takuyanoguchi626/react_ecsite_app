import axios from "axios";
import React, { useState, useEffect } from "react";
import { Item } from "../types/Item";
import { Link } from "react-router-dom";
import { View } from "react-native";

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
      <div className="search-wrapper">
        <div className="container">
          <form method="post" className="search-form">
            <input type="text" name="name" className="search-name-input" />
            <button className="btn search-btn" type="button">
              検索
            </button>
          </form>
        </div>
      </div>
      {/* mapで一覧表示させる */}
      {/* reactViewでCSSを適用する */}
      <View
        style={{
          // 横並びにする
          flexDirection: "row",
          // はみ出る場合、下に折り返す
          flexWrap: "wrap",
        }}
      >
        {itemList.map((item: Item) => {
          return (
            <div className="item-wrapper">
              <div className="container">
                <div className="items">
                  <div className="item">
                    <div className="item-icon">
                      <Link to={"/ItemDetail/" + `${item.id}`}>
                        <img src={`${item.imagePath}`} alt="images" />
                        <p>{item.name}</p>
                      </Link>
                    </div>
                    <span className="price">M</span>:{item.priceM}
                    <br />
                    <span className="price">L</span>:{item.priceL}
                    <br />
                    {/* end of itemList */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </View>
    </div>
  );
};
