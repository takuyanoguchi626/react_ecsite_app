import React from "react";
import { CartListTable } from "../components/CartListTable";

export default function OrderComFirm() {
  return (
    <div>
      <CartListTable></CartListTable>
      <div>
        <h1>注文内容確認</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>商品名</th>
                <th>サイズ、価格(税抜)、数量</th>
                <th>トッピング、価格(税抜)</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <img src="img/1.jpg" alt="" />
                  </div>
                  <span>ハワイアンパラダイス</span>
                </td>
                <td>
                  <span>&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円 &nbsp;&nbsp;1個
                </td>
                <td>
                  <ul>
                    <li>ピーマン300円</li>
                    <li>オニオン300円</li>
                    <li>あらびきソーセージ300円</li>
                  </ul>
                </td>
                <td>
                  <div>3,280円</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <img src="img/1.jpg" alt="" />
                  </div>
                  <span>ハワイアンパラダイス</span>
                </td>
                <td>
                  <span>&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円 &nbsp;&nbsp;1個
                </td>
                <td>
                  <ul>
                    <li>ピーマン300円</li>
                    <li>オニオン300円</li>
                    <li>あらびきソーセージ300円</li>
                  </ul>
                </td>
                <td>
                  <div>3,280円</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <img src="img/1.jpg" alt="" />
                  </div>
                  <span>ハワイアンパラダイス</span>
                </td>
                <td>
                  <span>&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円 &nbsp;&nbsp;1個
                </td>
                <td>
                  <ul>
                    <li>ピーマン300円</li>
                    <li>オニオン300円</li>
                    <li>あらびきソーセージ300円</li>
                  </ul>
                </td>
                <td>
                  <div>3,280円</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div>消費税：8,000円</div>
          <div>ご注文金額合計：38,000円 (税込)</div>
        </div>

        <h2>お届け先情報</h2>
        <div>
          <div>
            <div>
              <input id="name" type="text" />
              <label htmlFor="name">お名前</label>
            </div>
          </div>
          <div>
            <div>
              <input id="email" type="email" />
              <label htmlFor="email">メールアドレス</label>
            </div>
          </div>
          <div>
            <div>
              <input id="zipcode" type="text" />
              <label htmlFor="zipcode">郵便番号(ハイフンなし)</label>
              <button type="button">
                <span>住所検索</span>
              </button>
            </div>
          </div>
          <div>
            <div>
              <input id="address" type="text" />
              <label htmlFor="address">住所</label>
            </div>
          </div>
          <div>
            <div>
              <input id="tel" type="tel" />
              <label htmlFor="tel">電話番号</label>
            </div>
          </div>
          <div>
            <div>
              <input id="deliveryDate" type="date" />
              <label htmlFor="address">配達日時</label>
            </div>
            <label>
              <input name="deliveryTime" type="radio" value="10時" />
              <span>10時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="11時" />
              <span>11時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="12時" />
              <span>12時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="13時" />
              <span>13時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="14時" />
              <span>14時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="15時" />
              <span>15時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="16時" />
              <span>16時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="17時" />
              <span>17時</span>
            </label>
            <label>
              <input name="deliveryTime" type="radio" value="18時" />
              <span>18時</span>
            </label>
          </div>
        </div>

        <h2>お支払い方法</h2>
        <div>
          <span>
            <label>
              <input name="paymentMethod" type="radio" value="1" />
              <span>代金引換</span>
            </label>
            <label>
              <input name="paymentMethod" type="radio" value="2" />
              <span>クレジットカード</span>
            </label>
          </span>
        </div>
        <div>
          <button type="button">
            <span>この内容で注文する</span>
          </button>
        </div>
      </div>
    </div>
  );
}
