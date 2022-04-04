import { User } from "@/types/User";
import { OrderItem } from "./OrderItem";
/**
 * 注文情報をあらわすクラスです.
 */
export class Order {
  constructor(
    private _id: number,
    private _userId: number,
    private _status: number,
    private _totalPrice: number,
    private _orderDate: Date,
    private _distinationName: string,
    private _distinationEmail: string,
    private _distinationZipcode: string,
    private _distinationAddress: string,
    private _distinationTel: string,
    private _deliveryTime: Date,
    private _paymentMethod: number,
    private _user: User,
    private _orderItemList: Array<OrderItem>
  ) {}

  /**
   * 消費税を取得します.
   *
   * @returns - 消費税
   */
  get tax(): number {
    let totalPrice = this.totalPrice;
    for (const orderItem of this.orderItemList) {
      totalPrice = totalPrice + orderItem.getCalcSubTotalPrice();
    }
    return totalPrice * 0.1;
  }

  /**
   * 注文合計金額をあらわします.
   *
   * @returns - 注文商品の合計金額
   */
  get calcTotalPrice(): number {
    let totalPrice = this.totalPrice;
    // 合計金額を取得
    for (const orderItem of this.orderItemList) {
      totalPrice += orderItem.getCalcSubTotalPrice();
    }
    return totalPrice + this.tax;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get userId(): number {
    return this._userId;
  }

  public set userId(userId: number) {
    this._userId = userId;
  }

  public get status(): number {
    return this._status;
  }

  public set status(status: number) {
    this._status = status;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public set totalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
  }

  public get orderDate(): Date {
    return this._orderDate;
  }

  public set orderDate(orderDate: Date) {
    this._orderDate = orderDate;
  }

  public get distinationName(): string {
    return this._distinationName;
  }

  public set distinationName(distinationName: string) {
    this._distinationName = distinationName;
  }

  public get distinationEmail(): string {
    return this._distinationEmail;
  }

  public set distinationEmail(distinationEmail: string) {
    this._distinationEmail = distinationEmail;
  }

  public get distinationZipcode(): string {
    return this._distinationZipcode;
  }

  public set distinationZipcode(distinationZipcode: string) {
    this._distinationZipcode = distinationZipcode;
  }

  public get distinationAddress(): string {
    return this._distinationAddress;
  }

  public set distinationAddress(distinationAddress: string) {
    this._distinationAddress = distinationAddress;
  }

  public get distinationTel(): string {
    return this._distinationTel;
  }

  public set distinationTel(distinationTel: string) {
    this._distinationTel = distinationTel;
  }

  public get deliveryTime(): Date {
    return this._deliveryTime;
  }

  public set deliveryTime(deliveryTime: Date) {
    this._deliveryTime = deliveryTime;
  }

  public get paymentMethod(): number {
    return this._paymentMethod;
  }

  public set paymentMethod(paymentMethod: number) {
    this._paymentMethod = paymentMethod;
  }

  public get user(): User {
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
  }

  public get orderItemList(): Array<OrderItem> {
    return this._orderItemList;
  }

  public set orderItemList(orderItemList: Array<OrderItem>) {
    this._orderItemList = orderItemList;
  }
}
