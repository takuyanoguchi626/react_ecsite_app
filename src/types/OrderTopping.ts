import { Topping } from "./topping";

export type OrderTopping = {
  id: number;
  toppingId: number;
  orderItemId: number;
  Topping: Topping;
};
