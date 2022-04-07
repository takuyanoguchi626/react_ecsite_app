import { OrderItem } from "./OrderItem";
import { User } from "./User";

export type Order = {
  id: number;
  userId: number;
  status: number;
  totalPrice: number;
  orderDate: Date;
  distinationName: string;
  distinationEmail: string;
  distinationZipcode: string;
  distinationAddress: string;
  distinationTel: string;
  deliveryTime: Date;
  paymentMethod: number;
  user: User;
  orderItemList: Array<OrderItem>;
};
