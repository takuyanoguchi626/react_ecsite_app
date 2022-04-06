import React, { createContext, ReactNode, useState } from "react";
import { OrderItem } from "../../types/OrderItem";

type props = {
  children: ReactNode;
};

type cartListType = {
  cartList: Array<OrderItem>;
  setCartList: React.Dispatch<React.SetStateAction<OrderItem[]>>;
};

export const cartListContext = createContext<cartListType | null>(null);

export const CartListProvider: React.FC<props> = (props) => {
  const { children } = props;

  const [cartList, setCartList] = useState<Array<OrderItem>>([]);

  //   const sample = { name: "takuya" };

  return (
    <cartListContext.Provider value={{ cartList, setCartList }}>
      {children}
    </cartListContext.Provider>
  );
};
