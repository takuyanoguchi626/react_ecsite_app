import React, { createContext, FC, ReactNode, useState } from "react";
import { OrderItem } from "../../types/OrderItem";

// propsの型定義
type props = {
  children: ReactNode;
};

type edit = {
  editOrderItem: OrderItem;
  setEditOrderItem: React.Dispatch<React.SetStateAction<OrderItem>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const EditContext = createContext<edit | null>(null);

export const EditProvider: FC<props> = (props) => {
  const { children } = props;
  const [editOrderItem, setEditOrderItem] = useState<OrderItem>({
    id: 0,
    itemId: 0,
    orderId: 0,
    quantity: 0,
    size: "",
    item: {
      deleted: false,
      description: "",
      id: 0,
      imagePath: "",
      name: "",
      priceL: 0,
      priceM: 0,
      toppingList: [],
      type: "",
    },
    orderToppingList: [],
  });

  const [index, setIndex] = useState(0);

  return (
    <EditContext.Provider
      value={{ editOrderItem, setEditOrderItem, index, setIndex }}
    >
      {children}
    </EditContext.Provider>
  );
};
