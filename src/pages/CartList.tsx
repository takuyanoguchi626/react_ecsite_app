import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { CartListTable } from "../components/CartListTable";
import { useTotalPrice } from "../hooks/useTotalPrice";
import "../css/cartList.css";

export const CartList = () => {
  const navigate = useNavigate();

  //ショッピングカートの商品の合計金額を取得
  const totalPrice = useTotalPrice();

  return (
    <>
      <div className="cartList">
        <div className="context">
          <h1>ショッピングカート</h1>
          <div>
            <CartListTable hasButton={true}></CartListTable>
          </div>
          <div>
            <div>消費税：{totalPrice.TAXOfTotalPrice}円</div>
            <div>ご注文金額合計：{totalPrice.finallyTotalPrice}円 (税込)</div>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => {
                navigate("/OrderComfirm/");
              }}
            >
              注文に進む
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/itemList/");
              }}
            >
              商品一覧に戻る
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
