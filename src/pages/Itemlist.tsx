/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Item } from "../types/Item";
import { Link } from "react-router-dom";
import { View } from "react-native";

export const ItemList = () => {
  const ItemListUrl = "http://153.127.48.168:8080/ecsite-api/item/items/pizza";
  // itemListというstate名で、メソッド名をsetItemListとし、useStateを使用して初期値を設定する。
  const [itemList, setItemList] = useState<Array<Item>>([]);
  const [showItemList, setShowItemList] = useState<Array<Item>>([]);
  const itemListLength = itemList.length;
  const perPage = 6;
  const numberOfPage = Math.ceil(itemListLength / perPage);

  // Add middleware to authenticate requests
  // app.use(myMiddleware);

  const changePage = (pageNumber: number) => {
    setShowItemList(() => {
      const showItemList = itemList.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      );
      return showItemList;
    });
  };

  useEffect(() => {
    changePage(1);
    // console.log("aaa");
  }, [itemList]);

  useEffect(() => {
    // axios呼び出し
    axios.get(ItemListUrl).then((response) => {
      // itemListにreponsedataをセットする
      setItemList(() => response.data.items);
    });
  }, []);

  const aaa = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked = !e.target.checked;
  };

  const [che, setChe] = useState(true);

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
      <div>
        <input
          type="checkbox"
          checked={che}
          onChange={(e) => aaa(e)}
          onClick={() => {
            setChe((che) => !che);
          }}
        />
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
        {showItemList.map((item: Item) => {
          return (
            <div key={item.id} className="item-wrapper">
              <div className="container">
                <div className="items">
                  <div className="item">
                    <div className="item-icon">
                      <Link to={`/ItemDetail/${item.id}`}>
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
      {[...Array(numberOfPage)].map((num: number, index: number) => {
        return (
          <span key={index}>
            <button
              onClick={() => {
                changePage(index + 1);
              }}
            >
              {index + 1}
            </button>
          </span>
        );
      })}
    </div>
  );
};
