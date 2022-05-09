import React, { createContext, ReactNode, useState } from "react";
import { app } from "../../app/config";
import { getAuth, signOut } from "firebase/auth";

// propsの型定義
type props = {
  children: ReactNode;
};

// VueでいうVueストアの作成
export const loginStatusContext = createContext<any | null>(null);

// すべてのコンポーネントでcartListContextが使えるようにする
export const LoginStatusProvider: React.FC<props> = (props) => {
  // app(=children)をpropsに格納する
  const { children } = props;
  // 実際の処理
  // //firebase認証機能の認証
  const authrization = getAuth(app);
  // ログイン状態確認
  const loginStatus = authrization.onAuthStateChanged((user) => {
    console.log(user);
  });
  // 表示
  return (
    <loginStatusContext.Provider value={{ loginStatus }}>
      {children}
      {/* ↑がAPPになることで、すべてのcartListContectがコンポーネントで使えるようになる */}
    </loginStatusContext.Provider>
  );
};
