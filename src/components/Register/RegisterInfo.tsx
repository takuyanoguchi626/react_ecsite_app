import { useState, useContext } from "react";
import { User } from "../../types/User";
import React, { createContext, ReactNode } from "react";

type props = {
  children: ReactNode;
};

type registerUserType = {
  registerData: User;
  setregisterData: React.Dispatch<React.SetStateAction<User>>;
};

export const registerInfoContext = createContext<registerUserType | null>(null);

export const RegisterInfo: React.FC<props> = (props) => {
  const { children } = props;

  const [registerData, setregisterData] = useState<User>({
    name: "山田太郎",
    mailAddress: "d@gmail.com",
    password: "password",
    zipcode: "123-4567",
    address: "新宿三丁目",
    telephone: "123-4567-8910",
  });

  return (
    <registerInfoContext.Provider value={{ registerData, setregisterData }}>
      {children}
    </registerInfoContext.Provider>
  );
};
