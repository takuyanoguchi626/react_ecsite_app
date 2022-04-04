import React from "react";
import { Link } from "react-router-dom";
import "../css/itemDetail.css";

export const ItemDetail = () => {
  return (
    <div>
      <h1>おいしいパスタ</h1>
      <img className="itemImage" src="/img/pasta.webp" alt="" />
      <p>世界で一番おいしいパスタ</p>
      <input id="M" name="size" type="radio" checked />
      <label htmlFor="M"> M 1380円</label>
      <input id="L" name="size" type="radio" />
      <label htmlFor="L">L 2380円</label>
      <nav>
        <Link to="/itemList">商品一覧に戻る</Link>
      </nav>
    </div>
  );
};
