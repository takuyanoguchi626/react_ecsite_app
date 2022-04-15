import React, { FC, useEffect, useState } from "react";
import { UserInfo } from "../types/UserInfo";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CartListTable } from "../components/CartListTable";

export const OrderComfirm: FC = () => {
  const navigate = useNavigate();
  //ユーザーが入力した情報
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    mailAddress: "",
    zipCode: 0,
    address: "",
    telephone: 0,
    deliveryDate: "",
    deliveryHour: 0,
    paymentMethod: 0,
  });
  //配達時間の表示の為の配列
  const deliveryHourArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  //注文のAPIの配達日時フォーマット
  const [deliveryTime, setDeliveryTime] = useState("");
  //deliveryDateとdeliveryHourを注文のAPIのフォーマットに整形
  // useEffect(() => {
  //   setDeliveryTime(() => {
  //     const deliveryTime = format(
  //       new Date(
  //         userInfo.deliveryDate + "T" + userInfo.deliveryHour + ":00:00"
  //       ),
  //       "yyyy/MM/dd HH:mm:ss"
  //     );
  //     return deliveryTime;
  //   });
  // }, [userInfo.deliveryDate, userInfo.deliveryHour]);
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
        status: 0, //仮
        totalPrice: 1000, //仮
        destinationName: userInfo.name,
        destinationEmail: userInfo.mailAddress,
        destinationZipcode: userInfo.zipCode,
        destinationAddress: userInfo.address,
        destinationTel: userInfo.telephone,
        deliveryTime: deliveryTime,
        paymentMethod: userInfo.paymentMethod,
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

  return (
    <div>
      <CartListTable></CartListTable>
      <div>
        <h2>お届け先情報</h2>
        <div>
          <div>
            <div>
              <label htmlFor="name">お名前</label>
              <input
                id="name"
                type="text"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, name: e.target.value });
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
                onChange={(e) => {
                  setUserInfo({ ...userInfo, mailAddress: e.target.value });
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
                onChange={(e) => {
                  setUserInfo({ ...userInfo, zipCode: Number(e.target.value) });
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, address: e.target.value })
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({
                    ...userInfo,
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
                //   setUserInfo(() => {
                //     console.log(e.target.value);

                //     const deliveryDate = format(
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
                    setUserInfo({
                      ...userInfo,
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
                  setUserInfo({
                    ...userInfo,
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
                  setUserInfo({
                    ...userInfo,
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
