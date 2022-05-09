import React, { FC, useContext, useEffect, useState } from "react";
import { UserInfo } from "../types/UserInfo";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CartListTable } from "../components/CartListTable";
import { useTotalPrice } from "../hooks/useTotalPrice";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore, query, where } from "firebase/firestore";
import { app } from "../app/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { registerInfoContext } from "../components/Register/RegisterInfo";
import { userContext } from "../components/providers/UserInfoContext";

export const OrderComfirm: FC = () => {
  const navigate = useNavigate();
  const totalPrice = useTotalPrice();
  //ユーザーが入力した情報
  console.log("useStateが呼ばれた");

  // const [userInfo, setUserInfo] = useState<UserInfo>({
  //   name: "",
  //   mailAddress: "",
  //   zipCode: 0,
  //   address: "",
  //   telephone: 0,
  //   deliveryDate: "1111-11-11",
  //   deliveryHour: 12,
  //   paymentMethod: 0,
  // });

  const userStatus = useContext(userContext);

  //配達時間の表示の為の配列
  const deliveryHourArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  //注文のAPIの配達日時フォーマット
  const [deliveryTime, setDeliveryTime] = useState("");
  // deliveryDateとdeliveryHourを注文のAPIのフォーマットに整形
  useEffect(() => {
    setDeliveryTime(() => {
      const deliveryTime = format(
        new Date(
          userStatus?.userInfo.deliveryDate +
            "T" +
            userStatus?.userInfo.deliveryHour +
            ":00:00"
        ),
        "yyyy/MM/dd HH:mm:ss"
      );
      return deliveryTime;
    });
  }, [userStatus?.userInfo.deliveryDate, userStatus?.userInfo.deliveryHour]);
  //注文失敗時のエラーメッセージ
  const [orderErrorMessage, setOrderErrorMessage] = useState("");
  /**
   * 商品を注文する.
   */
  const order = async () => {
    setOrderErrorMessage(() => "");
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/order`,
      {
        userId: 0, //仮
        status: 0,
        totalPrice: totalPrice.finallyTotalPrice,
        destinationName: userStatus?.userInfo.name,
        destinationEmail: userStatus?.userInfo.mailAddress,
        destinationZipcode: userStatus?.userInfo.zipCode,
        destinationAddress: userStatus?.userInfo.address,
        destinationTel: userStatus?.userInfo.telephone,
        deliveryTime: deliveryTime,
        paymentMethod: userStatus?.userInfo.paymentMethod,
        orderItemFormList: [], //仮
      }
    );
    const status = response.data.status;
    if (status === "success") {
      navigate("/orderFinished");
    } else {
      setOrderErrorMessage(() => "注文できませんでした。");
    }
  };

  // firebaseからユーザー情報を反映させる
  const db = getFirestore(app);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const currentUserEmail = currentUser?.email;

  let inputUserName = "";
  let inputUserEmail = "";
  let inputUserZipCode = 0;
  let inputUserAddress = "";
  let inputUserTelephone = 0;

  const autoComplete = async () => {
    const userInfoRef = collection(db, "userInformation");
    // クエリを実行する
    const filteredData = query(
      userInfoRef,
      where("email", "==", `${currentUserEmail}`)
    );
    // クエリ結果を取得する
    const filteredSnapshot = await getDocs(filteredData);
    filteredSnapshot.forEach((doc) => {
      inputUserName = doc.get("name");
      inputUserEmail = doc.get("email");
      inputUserZipCode = doc.get("zipcode");
      inputUserAddress = doc.get("address");
      inputUserTelephone = doc.get("telephone");
      console.log("firebaseから取得した結果＝＝＝");
      console.log(inputUserName);
      console.log(inputUserEmail);
      console.log(inputUserZipCode);
      console.log(inputUserAddress);
      console.log(inputUserTelephone);
      console.log("firebaseから取得した結果ここまで＝＝＝");
    });

    // 郵便番号のフォーマット
    const stringZipCode = String(inputUserZipCode);
    console.log(stringZipCode);
    const formatZipCode = stringZipCode.replace("-", "");
    console.log(formatZipCode);
    const numberZipCode = Number(formatZipCode);
    console.log(numberZipCode);
    // 入力欄を更新
    userStatus?.setUserInfo({
      ...userStatus?.userInfo,
      name: inputUserName,
      mailAddress: inputUserEmail,
      zipCode: numberZipCode,
      address: inputUserAddress,
      telephone: inputUserTelephone,
    });

    console.log("セット作業が完了");
    console.log(userStatus?.userInfo);
  };

  return (
    <div>
      <CartListTable hasButton={false}></CartListTable>
      <div>
        <div>消費税：{totalPrice.TAXOfTotalPrice}円</div>
        <div>ご注文金額合計：{totalPrice.finallyTotalPrice}円 (税込)</div>
      </div>
      <div>
        <h2>お届け先情報</h2>
        <div>
          <button type="button" onClick={autoComplete}>
            自動入力
          </button>
          <div>
            <div>
              <label htmlFor="name">お名前</label>
              <input
                id="name"
                type="text"
                value={userStatus?.userInfo.name}
                onChange={(e) => {
                  userStatus?.setUserInfo({
                    ...userStatus?.userInfo,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                type="email"
                value={userStatus?.userInfo.mailAddress}
                onChange={(e) => {
                  userStatus?.setUserInfo({
                    ...userStatus?.userInfo,
                    mailAddress: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="zipcode">郵便番号(ハイフンなし)</label>
              <input
                id="zipcode"
                type="number"
                value={userStatus?.userInfo.zipCode}
                onChange={(e) => {
                  userStatus?.setUserInfo({
                    ...userStatus?.userInfo,
                    zipCode: Number(e.target.value),
                  });
                }}
              />
              <button type="button">
                <span>住所検索</span>
              </button>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="address">住所</label>
              <input
                id="address"
                type="text"
                value={userStatus?.userInfo.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userStatus?.setUserInfo({
                    ...userStatus?.userInfo,
                    address: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="tel">電話番号</label>
              <input
                id="tel"
                type="tel"
                value={userStatus?.userInfo.telephone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userStatus?.setUserInfo({
                    ...userStatus?.userInfo,
                    telephone: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="address">配達日時</label>
              <input
                id="deliveryDate"
                type="date"
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //   userStatus?.setUserInfo(() => {
                //     console.log(e.target.value);

                //      deliveryDate = format(
                //       new Date(e.target.value),
                //       "yyyy-MM-dd"
                //     );
                //     return { ...userInfo, deliveryDate: deliveryDate };
                //   })
                // }
              />
            </div>
            {deliveryHourArr.map((time: number, index: number) => (
              <label key={index}>
                <input
                  name="deliveryTime"
                  type="radio"
                  value={time}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    userStatus?.setUserInfo({
                      ...userStatus?.userInfo,
                      deliveryHour: Number(e.target.value),
                    })
                  }
                />
                <span>{time}時</span>
              </label>
            ))}
          </div>
        </div>
        <h2>お支払い方法</h2>
        <div>
          <span>
            <label>
              <input
                name="paymentMethod"
                type="radio"
                value="1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userStatus?.setUserInfo({
                    ...userStatus?.userInfo,
                    paymentMethod: Number(e.target.value),
                  })
                }
              />
              <span>代金引換</span>
            </label>
            <label>
              <input
                name="paymentMethod"
                type="radio"
                value="2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userStatus?.setUserInfo({
                    ...userStatus?.userInfo,
                    paymentMethod: Number(e.target.value),
                  })
                }
              />
              <span>クレジットカード</span>
            </label>
          </span>
        </div>
        <div>
          <div>{orderErrorMessage}</div>
          <button type="button" onClick={order}>
            <span>この内容で注文する</span>
          </button>
        </div>
      </div>
    </div>
  );
};
