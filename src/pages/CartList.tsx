import { useNavigate } from "react-router-dom";

export const CartList = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>ショッピングカート</div>
      <div>
        <button
          onClick={() => {
            navigate("/itemList/");
          }}
        >
          商品一覧に戻る
        </button>
      </div>
    </>
  );
};
