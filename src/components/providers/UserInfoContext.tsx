import React, { createContext, ReactNode, useState } from "react";
import { User } from "../../types/User";
import { UserInfo } from "../../types/UserInfo";

// propsの型定義
type props = {
  children: ReactNode;
};

type userType = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

export const userContext = createContext<userType | null>(null);

export const UserProvider: React.FC<props> = (props) => {
  const { children } = props;

  console.log("useStateが呼ばれた");

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    mailAddress: "",
    zipCode: 0,
    address: "",
    telephone: 0,
    deliveryDate: "1111-11-11",
    deliveryHour: 12,
    paymentMethod: 0,
  });

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
};
