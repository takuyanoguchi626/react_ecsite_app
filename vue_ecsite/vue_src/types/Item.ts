import { Topping } from "./Topping";

export class Item {
  constructor(
    private _id: number,
    private _type: string,
    private _name: string,
    private _description: string,
    private _priceM: number,
    private _priceL: number,
    private _imagePath: string,
    private _deleted: boolean,
    private _toppingList: Array<Topping>
  ) {}
  //価格の表記（Mサイズ）を1000円単位でカンマを入れる
  get formatPriceM(): string {
    return this._priceM.toLocaleString();
  }
  //価格の表記（Lサイズ）を1000円単位でカンマを入れる
  get formatPriceL(): string {
    return this._priceL.toLocaleString();
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get type(): string {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get priceM(): number {
    return this._priceM;
  }

  public set priceM(priceM: number) {
    this._priceM = priceM;
  }

  public get priceL(): number {
    return this._priceL;
  }

  public set priceL(priceL: number) {
    this._priceL = priceL;
  }

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  public get deleted(): boolean {
    return this._deleted;
  }

  public set deleted(deleted: boolean) {
    this._deleted = deleted;
  }

  public get toppingList(): Array<Topping> {
    return this._toppingList;
  }

  public set toppingList(toppingList: Array<Topping>) {
    this._toppingList = toppingList;
  }
}
