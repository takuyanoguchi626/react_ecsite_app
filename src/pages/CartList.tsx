import { useNavigate } from "react-router-dom";

import { CartListTable } from "../components/CartListTable";
import { useTotalPrice } from "../hooks/useTotalPrice";

export const CartList = () => {
  const navigate = useNavigate();

  //ショッピングカートの商品の合計金額を取得
  const totalPrice = useTotalPrice();

  return (
    <>
      <div>
        <div>
          <h1>ショッピングカート</h1>
          <div>
            <CartListTable></CartListTable>
          </div>
          <div>
            <div>消費税：{totalPrice.TAXOfTotalPrice}円</div>
            <div>ご注文金額合計：{totalPrice.finallyTotalPrice}円 (税込)</div>
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
