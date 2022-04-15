import { FC, useEffect, useState } from "react";

type props = {
  priceM: number;
  priceL: number;
  orderItemSize: string;
};

export const OrderItemSize: FC<props> = (props) => {
  const { priceM, priceL, orderItemSize } = props;

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (orderItemSize === "M") {
      setPrice(priceM);
    } else if (orderItemSize === "L") {
      setPrice(priceL);
    }
    console.log("サイズのコンポーネント");
  }, [orderItemSize, priceM, priceL]);

  return <>{price}円</>;
};
