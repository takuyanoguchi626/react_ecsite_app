import React, { createContext, ReactNode } from "react";

type userInformationType = {
  mailAddress: string;
  password: string;
};

export const LoginInfoContext = createContext<userInformationType | null>(null);

export const userInforProvider = () => {
  const sampleInfo: userInformationType = {
    mailAddress: "taro@taro",
    password: "password",
  };

  return (
    <LoginInfoContext.Provider value={sampleInfo}>
      ...
    </LoginInfoContext.Provider>
  );
};
