/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "../types/Item";
import { Topping } from "../types/Topping";
import { cartListContext } from "../components/providers/CartListProvider";
import { OrderItem } from "../types/OrderItem";
import { OrderTopping } from "../types/OrderTopping";
import { orderContext } from "../components/providers/OrderProvider";
import { IdContext } from "../components/providers/IdProvider";
import "../css/itemDetail.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";

export const ItemDetail = () => {
  // routerからitemidを取得する
  const { itemId } = useParams();
  //APIから商品詳細の情報を取得
  useEffect(() => {
    axios
      .get("http://153.127.48.168:8080/ecsite-api/item/" + itemId)
      .then((response) => {
        const item = response.data.item;
        setItem(() => item);
        changeTotalPrice2(item);
        setToppingList(() => response.data.item.toppingList);
      });
  }, [itemId]);

  // 商品情報
  const [item, setItem] = useState<Item>({
    deleted: false,
    description: "",
    id: 0,
    imagePath: "",
    name: "",
    priceL: 0,
    priceM: 0,
    toppingList: [],
    type: "",
  });
  //商品のトッピング一覧
  const [toppingList, setToppingList] = useState<Array<Topping>>();

  // サイズの初期値
  const [size, setSize] = useState<string>("M");
  // サイズ選択
  const [hasSize, setHasSize] = useState(true);
  //チェックボックス変更するメソッド
  const changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSize(!hasSize);
    setSize(() => e.target.value);
  };

  // チェックしたトッピングのリスト
  const [selectedToppingIdList, setselectedToppingIdList] = useState<
    Array<number>
  >([]);

  // トッピングを選択、選択解除した際にトッピングIDを格納、削除する
  const getSelectedTopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      const toppingId: number = Number(event.target.value);
      const selectedToppingIdList2 = selectedToppingIdList;
      selectedToppingIdList2.push(toppingId);
      setselectedToppingIdList(() => selectedToppingIdList2);
    } else {
      const selectedToppingIdList2 = selectedToppingIdList;
      for (let i = 0; i < selectedToppingIdList2.length; i++) {
        if (selectedToppingIdList2[i] === Number(event.target.value)) {
          selectedToppingIdList2.splice(i, 1);
        }
      }
      setselectedToppingIdList(() => selectedToppingIdList2);
    }
    changeTotalPrice();
  };

  // 数量
  const [quantity, setQuantity] = useState<number>(1);

  //ショッピングカート
  const cart = useContext(cartListContext);
  // order情報
  const order = useContext(orderContext);
  //ID管理からIDを取得
  const id = useContext(IdContext);

  // カートにいれる
  const pushInCartList = () => {
    //選択したトッピングのIDでトッピング一覧を絞り込み
    const filteredToppingList = item?.toppingList?.filter((topping) => {
      // 選択したトッピングの数繰り返す
      for (let checkedToppingId of selectedToppingIdList) {
        // APIのトッピングと同じだった場合
        if (topping.id === checkedToppingId) {
          return true;
        }
      }
      return false;
    });

    // カートにいれるためにOrderTopping型に変換したオーダートッピング一覧
    const newOrderToppingList = new Array<OrderTopping>();

    // 選択したトッピングごとに繰り返し、変換用の配列に格納する
    for (let topping of filteredToppingList) {
      const orderTopping = topping;
      newOrderToppingList.push({
        id: Number(id?.orderToppingId),
        toppingId: orderTopping.id,
        orderItemId: item.id,
        Topping: orderTopping,
      });
      id?.setOrderToppingId((orderToppingId) => orderToppingId++);
    }

    // カートに商品を入れる
    const orderItem: OrderItem = {
      id: Number(id?.orderItemId),
      itemId: item.id,
      orderId: Number(order?.orderInfo.id),
      quantity: quantity,
      size: size,
      item: item,
      orderToppingList: newOrderToppingList,
    };
    cart?.setCartList([...cart.cartList, orderItem]);
    navigate("/CartList/");
  };

  // 合計金額
  const [totalPrice, setTotalPrice] = useState<number>(1);

  const changeTotalPrice = () => {
    setTotalPrice(() => {
      const selectedToppings = selectedToppingIdList.length;
      if (size === "M") {
        const toppingPrice = selectedToppings * 200;
        return (item.priceM + toppingPrice) * quantity;
      } else if (size === "L") {
        const toppingPrice = selectedToppings * 300;
        return (item.priceL + toppingPrice) * quantity;
      }
      return 2;
    });
  };
  //初回レンダリング時の特例のメソッド
  const changeTotalPrice2 = (item: Item) => {
    setTotalPrice(() => {
      const selectedToppings = selectedToppingIdList.length;
      if (size === "M") {
        const toppingPrice = selectedToppings * 200;
        return (item.priceM + toppingPrice) * quantity;
      } else if (size === "L") {
        const toppingPrice = selectedToppings * 300;
        return (item.priceL + toppingPrice) * quantity;
      }
      return 2;
    });
  };

  useEffect(() => {
    changeTotalPrice();
  }, [size, quantity]);

  //画面遷移のメソッド化
  const navigate = useNavigate();

  return (
    <div className="itemDetail">
      <div className="description">
        <img className="itemImage" src={item?.imagePath} alt="test" />
        <div>
          <h1>{item?.name}</h1>
          <p>{item?.description}</p>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">サイズ</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="M"
                control={<Radio checked={hasSize} onChange={changeSize} />}
                label="M"
              />
              <FormControlLabel
                value="L"
                control={<Radio checked={!hasSize} onChange={changeSize} />}
                label="L"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div>トッピング： 1つにつき Ｍ 200円(税抜) Ｌ 300 円(税抜)</div>
      <div className="topping">
        {toppingList?.map((topping, index) => {
          return (
            <FormGroup key={index}>
              <FormControlLabel
                control={
                  <Checkbox onChange={getSelectedTopping} value={topping.id} />
                }
                label={topping.name}
              />
            </FormGroup>
          );
        })}
      </div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">数量</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="1"
          label="Age"
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
      <div>この商品金額：{totalPrice}円（税抜）</div>
      <div className="button">
        <Button
          className="pushInCartList"
          variant="contained"
          color="secondary"
          onClick={() => {
            pushInCartList();
          }}
        >
          カートに入れる
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/itemList/");
          }}
        >
          商品一覧に戻る
        </Button>
      </div>
    </div>
  );
};
