import React, { createContext, ReactNode, useState } from "react";
import { OrderItem } from "../../types/OrderItem";

type props = {
  children: ReactNode;
};

type cartListType = {
  cartList: Array<OrderItem>;
  setCartList: React.Dispatch<React.SetStateAction<OrderItem[]>>;
};

// VueでいうVueストアの作成
export const cartListContext = createContext<cartListType | null>(null);

// すべてのコンポーネントでcartListContextが使えるようにする
export const CartListProvider: React.FC<props> = (props) => {
  const { children } = props;

  const [cartList, setCartList] = useState<Array<OrderItem>>([]);

  return (
    <cartListContext.Provider value={{ cartList, setCartList }}>
      {children}
      {/* ↑がAPPになることで、すべてのcartListContectがコンポーネントで使えるようになる */}
    </cartListContext.Provider>
  );
};
