import React, { FC, useEffect, useState } from "react";
import { UserInfo } from "../types/UserInfo";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CartListTable } from "../components/CartListTable";
import { useTotalPrice } from "../hooks/useTotalPrice";
import "../css/orderConfirm.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

export const OrderComfirm: FC = () => {
  const navigate = useNavigate();
  const totalPrice = useTotalPrice();
  //ユーザーが入力した情報
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
  //配達時間の表示の為の配列
  const deliveryHourArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  //注文のAPIの配達日時フォーマット
  const [deliveryTime, setDeliveryTime] = useState("");
  // deliveryDateとdeliveryHourを注文のAPIのフォーマットに整形
  useEffect(() => {
    setDeliveryTime(() => {
      const deliveryTime = format(
        new Date(
          userInfo.deliveryDate + "T" + userInfo.deliveryHour + ":00:00"
        ),
        "yyyy/MM/dd HH:mm:ss"
      );
      return deliveryTime;
    });
  }, [userInfo.deliveryDate, userInfo.deliveryHour]);
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
    <div className="orderConfirm">
      <div className="context">
        <CartListTable hasButton={false}></CartListTable>
        <div>
          <div>消費税：{totalPrice.TAXOfTotalPrice}円</div>
          <div>ご注文金額合計：{totalPrice.finallyTotalPrice}円 (税込)</div>
        </div>
        <div>
          <h2>お届け先情報</h2>
          <div>
            <div>
              <TextField
                className="textField"
                label="name"
                variant="outlined"
                id="name"
                type="text"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, name: e.target.value });
                }}
              />
            </div>
            <div>
              <TextField
                className="textField"
                label="email"
                variant="outlined"
                id="email"
                type="email"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, mailAddress: e.target.value });
                }}
              />
            </div>
            <div>
              <div>
                <TextField
                  className="textField"
                  label="zipCode"
                  variant="outlined"
                  id="zipcode"
                  type="number"
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      zipCode: Number(e.target.value),
                    });
                  }}
                />
                <Button type="button" variant="contained">
                  住所検索
                </Button>
              </div>
            </div>
            <div>
              <div>
                <TextField
                  className="textField"
                  label="address"
                  variant="outlined"
                  id="address"
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <TextField
                className="textField"
                label="telephone"
                variant="outlined"
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
            <div>
              <div>
                <div>配達日時：</div>
                <TextField
                  className="textField"
                  // label="deliveryDate"
                  variant="outlined"
                  id="deliveryDate"
                  type="date"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserInfo(() => {
                      console.log(e.target.value);

                      const deliveryDate = format(
                        new Date(e.target.value),
                        "yyyy-MM-dd"
                      );
                      return { ...userInfo, deliveryDate: deliveryDate };
                    })
                  }
                />
              </div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="10"
                  name="radio-buttons-group"
                >
                  {deliveryHourArr.map((time: number, index: number) => (
                    <FormControlLabel
                      value={time}
                      control={
                        <Radio
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUserInfo({
                              ...userInfo,
                              deliveryHour: Number(e.target.value),
                            })
                          }
                        />
                      }
                      label={time + "時"}
                    />
                    // <label key={index}>
                    // <input
                    //   name="deliveryTime"
                    //   type="radio"
                    //   value={time}
                    //   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //     setUserInfo({
                    //       ...userInfo,
                    //       deliveryHour: Number(e.target.value),
                    //     })
                    //   }
                    // />
                    //   <span>{time}時</span>
                    // </label>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                お支払方法
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="1"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({
                          ...userInfo,
                          paymentMethod: Number(e.target.value),
                        })
                      }
                    />
                  }
                  label="代金引換"
                />
                <FormControlLabel
                  value="2"
                  control={
                    <Radio
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({
                          ...userInfo,
                          paymentMethod: Number(e.target.value),
                        })
                      }
                    />
                  }
                  label="クレジットカード"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <div>{orderErrorMessage}</div>
            <Button type="button" variant="contained" onClick={order}>
              この内容で注文する
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
