import { createContext, useState } from "react";
import { Item } from "../../types/Item";

export const cartList = createContext({});

// export const CartListProvider = (props) => {
//   const { children } = props;

//   const [itemList, setItemList] = useState<Array<Item>>();
// };
