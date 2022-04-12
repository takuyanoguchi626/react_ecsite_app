import React, { createContext, ReactNode, useState } from "react";

type userInformationType = {
  mailAddress: string;
  password: string;
};

// const LoginInfo = createContext<userInformationType | null>(null);
type Props = {
  children: ReactNode;
};

export const UserProvider: React.VFC<Props> = ({ children }) => {
  const UserInforContext = createContext<boolean>(false);
  return (
    <div>
      <UserInforContext.Provider value={false}>
        {children}
      </UserInforContext.Provider>
    </div>
  );
};

// export const userInforProvider = () => {
//   const sampleInfo: userInformationType = {
//     mailAddress: "taro@taro",
//     password: "password",
//   };

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [islogin, setisLogin] = useState(false);

//   return (
//     <LoginInfo.Provider value={[sampleInfo, setisLogin]}>
//       ...
//     </LoginInfo.Provider>
//   );
// };
