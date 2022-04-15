import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { cartListContext } from "../components/providers/CartListProvider";
import { OrderItemSize } from "../components/OrderItemSize";

export const CartList = () => {
  const navigate = useNavigate();

  const cart = useContext(cartListContext);

  const cartList = cart?.cartList;
  console.log(cartList);

  return (
    <>
      {/* <div>ショッピングカート</div>
      <div>{cart?.cartList[0]?.name}</div>
      <div>
        <button
          onClick={() => {
            navigate("/itemList/");
          }}
        >
          商品一覧に戻る
        </button>
      </div>
      {cart?.cartList?.map((item: Item, index) => {
        return (
          <div key={index}>
            <h1>{item?.name}</h1>
            <img className="itemImage" src={item?.imagePath} alt="" />
            <p>{item?.description}</p>
          </div>
        );
      })} */}
      <div>
        <div>
          <h1>ショッピングカート</h1>

          <div>
            <table style={{ border: "solid black" }}>
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>サイズ、価格(税抜)、数量</th>
                  <th>トッピング、価格(税抜)</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                {cartList?.map((orderItem, index) => (
                  <tr key={index}>
                    <td>
                      <div>
                        <img src={orderItem.item.imagePath} alt="" />
                      </div>
                      <span>{orderItem.item.name}</span>
                    </td>
                    <td>
                      <OrderItemSize
                        orderItemSize={orderItem.size}
                        priceM={orderItem.item.priceM}
                        priceL={orderItem.item.priceL}
                      ></OrderItemSize>
                      &nbsp;&nbsp;{orderItem.quantity}個
                    </td>
                    <td>
                      <ul>
                        {/* まだトッピングリストは取得してない */}
                        <li>ピーマン300円</li>
                        <li>オニオン300円</li>
                        <li>あらびきソーセージ300円</li>
                      </ul>
                    </td>
                    <td>
                      <div>3,280円</div>
                    </td>
                    <td>
                      <button type="button">
                        <span>削除</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div>消費税：8,000円</div>
            <div>ご注文金額合計：38,000円 (税込)</div>
          </div>
          <div>
            <button type="button">
              <span>注文に進む</span>
            </button>
            <div>
              <button
                onClick={() => {
                  navigate("/itemList/");
                }}
              >
                商品一覧に戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
