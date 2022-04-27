import React, { createContext, ReactNode, useState } from "react";
import { Order } from "../../types/Order";

// propsの型定義
type props = {
  children: ReactNode;
};

type orderType = {
  orderInfo: Order;
  setOrderInfo: React.Dispatch<React.SetStateAction<Order>>;
};

export const orderContext = createContext<orderType | null>(null);

export const OrderProvider: React.FC<props> = (props) => {
  const { children } = props;

  const [orderInfo, setOrderInfo] = useState<Order>({
    id: 0,
    userId: 0,
    status: 0,
    totalPrice: 0,
    orderDate: new Date(),
    distinationName: "",
    distinationEmail: "",
    distinationZipcode: "",
    distinationAddress: "",
    distinationTel: "",
    deliveryTime: new Date(),
    paymentMethod: 0,
    user: {
      id: 0,
      name: "",
      mailAddress: "",
      password: "",
      zipcode: "",
      address: "",
      telephone: "",
    },
    orderItemList: [],
  });

  return (
    <orderContext.Provider value={{ orderInfo, setOrderInfo }}>
      {children}
    </orderContext.Provider>
  );
};
