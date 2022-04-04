import { Item } from "@/types/Item";
import { OrderTopping } from "./OrderTopping";
/**
 * 注文商品をあらわすクラスです.
 */

export class OrderItem {
  constructor(
    private _id: number,
    private _itemId: number,
    private _orderId: number,
    private _quantity: number,
    private _size: string,
    private _item: Item,
    private _orderToppingList: Array<OrderTopping>
  ) {}

  /**
   * 商品の合計を計算します.
   * @returns -商品の合計金額
   */
  getCalcSubTotalPrice(): number {
    // 商品の合計
    let totalSizePrice = 0;
    if (this.size === "M") {
      totalSizePrice = this.item.priceM;
    } else if (this.size === "L") {
      totalSizePrice = this.item.priceL;
    }

    // toppingの合計金額
    const orderToppings = this.orderToppingList;
    let totalToppingPrice = 0;
    for (const orderTopping of orderToppings) {
      if (this.size === "M") {
        totalToppingPrice += orderTopping.topping.priceM;
      } else if (this.size === "L") {
        totalToppingPrice += orderTopping.topping.priceL;
      }
    }
    return (totalSizePrice + totalToppingPrice) * this.quantity;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get itemId(): number {
    return this._itemId;
  }

  public set itemId(itemId: number) {
    this._itemId = itemId;
  }

  public get orderId(): number {
    return this._orderId;
  }

  public set orderId(orderId: number) {
    this._orderId = orderId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public get size(): string {
    return this._size;
  }

  public set size(size: string) {
    this._size = size;
  }

  public get item(): Item {
    return this._item;
  }

  public set item(item: Item) {
    this._item = item;
  }

  public get orderToppingList(): Array<OrderTopping> {
    return this._orderToppingList;
  }

  public set orderToppingList(orderToppingList: Array<OrderTopping>) {
    this._orderToppingList = orderToppingList;
  }
}
