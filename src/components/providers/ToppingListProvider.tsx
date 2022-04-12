import React, { createContext, ReactNode, useState } from "react";
import { OrderTopping } from "../../types/OrderTopping";
import { Topping } from "../../types/Topping";

// propsの型定義
type props = {
  children: ReactNode;
};

// 型定義
type toppingListType = {
  toppingList: Array<OrderTopping>;
  setToppingList: React.Dispatch<React.SetStateAction<OrderTopping[]>>;
};

// VueでいうVueストアの作成
export const ToppingListContext = createContext<toppingListType | null>(null);

// すべてのコンポーネントでcartListContextが使えるようにする
export const ToppingListProvider: React.FC<props> = (props) => {
  // app(=children)をpropsに格納する
  const { children } = props;
  // 実際の処理
  const [toppingList, setToppingList] = useState<Array<OrderTopping>>([]);
  // 表示
  return (
    <ToppingListContext.Provider value={{ toppingList, setToppingList }}>
      {children}
      {/* ↑がAPPになることで、すべてのcartListContectがコンポーネントで使えるようになる */}
    </ToppingListContext.Provider>
  );
};
