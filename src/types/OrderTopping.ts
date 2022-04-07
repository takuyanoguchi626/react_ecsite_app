import { Topping } from "./Topping";

export type OrderTopping = {
  id: number;
  toppingId: number;
  orderItemId: number;
  Topping: Topping;
};
