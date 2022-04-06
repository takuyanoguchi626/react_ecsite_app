import { useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { cartListContext } from "../components/providers/CartListProvider";
import { Item } from "../types/Item";

export const CartList = () => {
  const navigate = useNavigate();

  const cart = useContext(cartListContext);

  return (
    <>
      <div>ショッピングカート</div>
      <div>{cart?.cartList[0]?.name}</div>
      <div>
        <button
          onClick={() => {
            navigate("/itemList/");
          }}
        >
          商品一覧に戻る
        </button>
      </div>
      {cart?.cartList?.map((item: Item, index) => {
        return (
          <div key={index}>
            <h1>{item?.name}</h1>
            <img className="itemImage" src={item?.imagePath} alt="" />
            <p>{item?.description}</p>
          </div>
        );
      })}
    </>
  );
};
