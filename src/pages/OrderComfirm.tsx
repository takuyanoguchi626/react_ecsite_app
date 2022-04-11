import React, { FC, useEffect, useState } from "react";
// import { UserInfo } from "../types/UserInfo";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
// import { CartListTable } from "../components/CartListTable";

export const OrderComfirm: FC = () => {
  const navigate = useNavigate();

  // const [userInfo, setUserInfo] = useState<UserInfo>({
  //   name: "",
  //   mailAddress: "",
  //   zipCode: 0,
  //   address: "",
  //   telephone: 0,
  //   deliveryDate: new Date(),
  //   deliveryHour: 0,
  //   paymentMethod: 0,
  // });
  const [name, setName] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [zipcode, setZipcode] = useState(0);
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("1111-11-11");
  const [deliveryHour, setDeliveryHour] = useState("01");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [orderErrorMessage, setOrderErrorMessage] = useState("");

  const [deliveryTime, setDeliveryTime] = useState("");
  useEffect(() => {
    setDeliveryDate((date: string) => {
      const deliveryDate = format(new Date(date), "yyyy-MM-dd");
      return deliveryDate;
    });
  }, []);

  useEffect(() => {
    setDeliveryTime(() => {
      const deliveryTime = format(
        new Date(deliveryDate + "T" + deliveryHour + ":00:00"),
        "yyyy/MM/dd HH:mm:ss"
      );
      return deliveryTime;
    });
  }, [deliveryDate, deliveryHour]);

  // useEffect(() => {
  //   setUserInfo((userInfo: UserInfo) => {
  //     return {
  //       name: name,
  //       mailAddress: mailAddress,
  //       zipCode: zipcode,
  //       address: address,
  //       telephone: telephone,
  //       deliveryDate: deliveryDate,
  //       deliveryHour: deliveryHour,
  //       paymentMethod: paymentMethod,
  //     };
  //   });
  // }, [
  //   name,
  //   mailAddress,
  //   zipcode,
  //   address,
  //   telephone,
  //   deliveryDate,
  //   deliveryHour,
  //   paymentMethod,
  // ]);

  // console.log(userInfo);

  const order = async () => {
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/order`,
      {
        userId: 0, //仮
        status: 0, //仮
        totalPrice: 1000, //仮
        destinationName: name,
        destinationEmail: mailAddress,
        destinationZipcode: zipcode,
        destinationAddress: address,
        destinationTel: telephone,
        deliveryTime: deliveryTime,
        paymentMethod: paymentMethod,
        orderItemFormList: [], //仮
      }
    );
    console.log(response.data.status);
    const status = response.data.status;
    if (status === "success") {
      navigate("/orderFinished");
    } else {
      setOrderErrorMessage(() => "注文できませんでした。");
    }
  };

  return (
    <div>
      {/* <CartListTable></CartListTable> */}
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
                  setName(() => e.target.value);
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
                  setMailAddress(() => e.target.value);
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
                  setZipcode(() => Number(e.target.value));
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
                  setAddress(() => e.target.value)
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
                  setTelephone(() => Number(e.target.value))
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryDate(() => e.target.value)
                }
              />
            </div>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="10"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>10時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="11"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>11時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="12"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>12時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="13"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>13時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="14"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>14時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="15"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>15時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="16"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>16時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="17"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>17時</span>
            </label>
            <label>
              <input
                name="deliveryTime"
                type="radio"
                value="18"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryHour(() => e.target.value)
                }
              />
              <span>18時</span>
            </label>
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
                  setPaymentMethod(() => Number(e.target.value))
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
                  setPaymentMethod(() => Number(e.target.value))
                }
              />
              <span>クレジットカード</span>
            </label>
          </span>
        </div>
        <div>
          <button type="button" onClick={order}>
            <span>この内容で注文する</span>
          </button>
        </div>
      </div>
    </div>
  );
};
