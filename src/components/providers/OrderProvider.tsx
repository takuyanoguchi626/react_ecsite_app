import React, { createContext, ReactNode, useState } from "react";
import { Order } from "../../types/Order";

// propsの型定義
type props = {
  children: ReactNode;
};

type orderType = {
  orderInfo: Array<Order>;
  setOrderInfo: React.Dispatch<React.SetStateAction<Order[]>>;
};

export const orderContext = createContext<orderType | null>(null);

export const OrderProvider: React.FC<props> = (props) => {
  const { children } = props;

  const [orderInfo, setOrderInfo] = useState<Array<Order>>([]);

  return (
    <orderContext.Provider value={{ orderInfo, setOrderInfo }}>
      {children}
    </orderContext.Provider>
  );
};
