import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  statusCheck: boolean;
  setstatusCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

export const statusContext = createContext<InitialState | null>(null);

export const StatusProvider: React.VFC<Props> = ({ children }) => {
  const [statusCheck, setstatusCheck] = useState(false);
  return (
    <statusContext.Provider value={{ statusCheck, setstatusCheck }}>
      {children}
    </statusContext.Provider>
  );
};
