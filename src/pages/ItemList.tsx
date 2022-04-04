import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/itemList.css";
import { item } from "../types/item";

export const ItemList = () => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    axios
      .get("http://153.127.48.168:8080/ecsite-api/item/items/coffee")
      .then((res) => {
        console.dir(JSON.stringify(res));
        setItemList(() => res.data.items);
      });
  }, []);

  console.log(itemList);

  return (
    <div className="container">
      <input type="text" />
      <button>検索</button>
      <div className="itemList">
        {itemList.map((item: item) => {
          return (
            <div>
              <nav>
                <Link to="/ItemDetail">
                  <img className="itemImage" src={item.imagePath} alt="" />
                </Link>
              </nav>
              <p>{item.name}</p>
              <span>Ｍ</span>
              {item.priceM}円(税抜)
              <br />
              <span>Ｌ</span>
              {item.priceL}円(税抜)
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};
