import { Item } from "../types/Item";
import { OrderTopping } from "./OrderTopping";

export type OrderItem = {
  id: number;
  itemId: number;
  orderId: number;
  quantity: number;
  size: string;
  item: Item;
  orderToppingList: Array<OrderTopping>;
};
