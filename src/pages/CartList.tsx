import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { cartListContext } from "../components/providers/CartListProvider";
import { OrderItemSize } from "../components/OrderItemSize";
import { CalcTotalPrice } from "../components/CalcTotalPrice";
import { CartListTable } from "../components/CartListTable";

export const CartList = () => {
  const navigate = useNavigate();

  const cart = useContext(cartListContext);

  const cartList = cart?.cartList;
  console.log(cartList);

  return (
    <>
      <div>
        <div>
          <h1>ショッピングカート</h1>
          <div>
            <CartListTable></CartListTable>
          </div>

          <div>
            <div>消費税：8,000円</div>
            <div>ご注文金額合計：38,000円 (税込)</div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                navigate("/orderComfirm/");
              }}
            >
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
