import { topping } from "./topping";

export type item = {
  deleted: boolean;
  description: string;
  id: number;
  imagePath: string;
  name: string;
  priceL: number;
  priceM: number;
  toppingList: Array<topping>;
  type: string;
};
