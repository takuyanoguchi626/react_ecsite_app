import React, { createContext, ReactNode, useState } from "react";
import { OrderItem } from "../../types/OrderItem";

// propsの型定義
type props = {
  children: ReactNode;
};

// 型定義
type cartListType = {
  cartList: Array<OrderItem>;
  setCartList: React.Dispatch<React.SetStateAction<OrderItem[]>>;
};

// VueでいうVueストアの作成
export const cartListContext = createContext<cartListType | null>(null);

// すべてのコンポーネントでcartListContextが使えるようにする
export const CartListProvider: React.FC<props> = (props) => {
  // app(=children)をpropsに格納する
  const { children } = props;
  // 実際の処理
  const [cartList, setCartList] = useState<Array<OrderItem>>([]);
  // 表示
  return (
    <cartListContext.Provider value={{ cartList, setCartList }}>
      {children}
      {/* ↑がAPPになることで、すべてのcartListContectがコンポーネントで使えるようになる */}
    </cartListContext.Provider>
  );
};
