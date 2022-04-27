import React, { createContext, FC, ReactNode, useState } from "react";

type props = {
  children: ReactNode;
};

type id = {
  orderItemId: number;
  setOrderItemId: React.Dispatch<React.SetStateAction<number>>;
  orderToppingId: number;
  setOrderToppingId: React.Dispatch<React.SetStateAction<number>>;
};

export const IdContext = createContext<id | null>(null);

export const IdProvider: FC<props> = (props) => {
  const { children } = props;

  const [orderItemId, setOrderItemId] = useState(0);
  const [orderToppingId, setOrderToppingId] = useState(0);

  return (
    <IdContext.Provider
      value={{ orderItemId, setOrderItemId, orderToppingId, setOrderToppingId }}
    >
      {children}
    </IdContext.Provider>
  );
};
