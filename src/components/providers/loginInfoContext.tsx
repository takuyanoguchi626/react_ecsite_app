import React, { createContext, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type userInformation = {
  mailAddress: string;
  password: string;
};

export const LoginInfoContext = createContext<userInformation | null>(null);

export const userInfoProvider: React.VFC<Props> = ({ children }) => {
  const sampleInfo: userInformation = {
    mailAddress: "taro@taro",
    password: "password",
  };

  return (
    <LoginInfoContext.Provider value={sampleInfo}>
      {children}
    </LoginInfoContext.Provider>
  );
};
