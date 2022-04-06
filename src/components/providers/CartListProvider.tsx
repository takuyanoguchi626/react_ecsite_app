import React, { createContext, ReactNode, useState } from "react";
import { Item } from "../../types/Item";

type props = {
  children: ReactNode;
};

type cartListType = {
  cartList: Array<Item>;
  setCartList: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const cartListContext = createContext<cartListType | null>(null);

export const CartListProvider: React.FC<props> = (props) => {
  const { children } = props;

  const [cartList, setCartList] = useState<Array<Item>>([]);

  //   const sample = { name: "takuya" };

  return (
    <cartListContext.Provider value={{ cartList, setCartList }}>
      {children}
    </cartListContext.Provider>
  );
};
