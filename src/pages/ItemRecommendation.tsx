import React, { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "../types/Item";
import { Link } from "react-router-dom";
import { View } from "react-native";

export const ItemRecommendation = () => {
  const ItemListUrl = "http://153.127.48.168:8080/ecsite-api/item/items/pizza";
  // itemListというstate名で、メソッド名をsetItemListとし、useStateを使用して初期値を設定する。
  const [itemList, setItemList] = useState<Array<Item>>([]);

  useEffect(() => {
    // axios呼び出し
    axios.get(ItemListUrl).then((response) => {
      // itemListにreponsedataをセットする
      setItemList(() => response.data.items);
    });
  }, []);

  // ランダム用のID作成
  const randomID: number[] = [];

  for (let i = 0; i <= itemList.length - 1; i++) {
    randomID.push(Math.random());
  }

  // APIのアイテムをソートし、ランダムで生成したIDのindexに該当するアイテムを表示する
  itemList.sort((a, b) => {
    return randomID[itemList.indexOf(a)] - randomID[itemList.indexOf(b)];
  });

  // 表示数の調整
  for (let i = 1; i <= 3; i++) {
    itemList.splice(1, itemList.length - 3);
  }

  return (
    <div>
      <span>この商品も一緒にいかがですか？</span>
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
            <div key={item.id}>
              <br />
              <div>
                <Link to={`/ItemDetail/${item.id}`}>
                  <img src={`${item.imagePath}`} alt="images" />
                </Link>
              </div>
              <span>{item.name}</span>
              <div>
                <Link to={`/itemDetail/${item.id}`}>
                  <button type="button">注文する</button>
                </Link>
              </div>
            </div>
          );
        })}
      </View>
    </div>
  );
};
