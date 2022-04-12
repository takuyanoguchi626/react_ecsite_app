import { Topping } from "./Topping-2";

export type OrderTopping = {
  id: number;
  toppingId: number;
  orderItemId: number;
  Topping: Topping;
};
