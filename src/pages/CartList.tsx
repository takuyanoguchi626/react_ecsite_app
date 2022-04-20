import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { cartListContext } from "../components/providers/CartListProvider";
import { CartListTable } from "../components/CartListTable";
import { useTotalPrice } from "../hooks/useTotalPrice";

export const CartList = () => {
  const navigate = useNavigate();

  const totalPrice = useTotalPrice();
  const TAXRate = 0.1;
  const TAXOfTotalPrice = totalPrice.totalPrice * TAXRate;
  const finallyTotalPrice = totalPrice.totalPrice + TAXOfTotalPrice;

  return (
    <>
      <div>
        <div>
          <h1>ショッピングカート</h1>
          <div>
            <CartListTable></CartListTable>
          </div>
          <div>
            <div>消費税：{TAXOfTotalPrice}円</div>
            <div>ご注文金額合計：{finallyTotalPrice}円 (税込)</div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                navigate("/OrderComfirm/");
              }}
            >
              <span>注文に進む</span>
            </button>
            <div>
              <button
                onClick={() => {
                  navigate("/ItemList/");
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
