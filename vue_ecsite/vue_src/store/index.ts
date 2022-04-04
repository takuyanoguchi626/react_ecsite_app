import { Item } from "@/types/Item";
import { Order } from "@/types/Order";
import { OrderItem } from "@/types/OrderItem";
import { OrderTopping } from "@/types/OrderTopping";
import { User } from "@/types/User";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalItemCount: 0,
    itemList: new Array<Item>(),
    userOrderInfo: new Order(
      0,
      0,
      0,
      0,
      new Date(),
      "",
      "",
      "",
      "",
      "",
      new Date(),
      0,
      new User(0, "", "", "", "", "", ""),
      Array<OrderItem>()
    ),
    //ログイン、ログアウト状態の表示(true=ログイン、false=ログアウト)
    logStatus: false,
  }, //end of state

  actions: {
    /**
     * 商品一覧情報をWebAPIから取得してmutationを呼び出す.
     *
     * @param context コンテキスト
     */
    async getItemList(context) {
      //WebAPIから商品一覧情報を取得
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/items/aloha"
      );
      console.log("aaa");

      console.dir("response:" + JSON.stringify(response));
      const payload = response.data;
      context.commit("setItemList", payload);
    },
  }, //end of actions

  mutations: {
    /**
     * ログインする.
     *
     * @param state ステート
     */
    login(state) {
      state.logStatus = true;
    },
    /**
     * ログアウトする.
     *
     * @param state ステート
     */
    logout(state) {
      state.logStatus = false;
    },

    /**
     * ログインユーザーをUserにセットする.
     *
     * @param state -state
     * @param payload -ログインユーザー情報
     */
    setUserInfo(state, payload) {
      state.userOrderInfo.user = new User(
        payload.id,
        payload.name,
        payload.email,
        payload.password,
        payload.zipcode,
        payload.address,
        payload.telephone
      );
    },

    /**
     * 注文商品を1品削除する.
     *
     * @param state - ステート
     * @param payload - 注文商品番号
     */
    deleteCartItem(state, payload) {
      state.userOrderInfo.orderItemList.splice(payload.index, 1);
    },

    setItemList(state, payload) {
      //stateの商品数にペイロードの商品数を格納する
      state.totalItemCount = payload.totalItemCount;
      //呼ばれる度に追加されないよう空の配列で初期化する
      state.itemList = new Array<Item>();
      //商品情報のItemオブジェクトを作成しpushする
      for (const item of payload.items) {
        state.itemList.push(
          new Item(
            item.id,
            item.type,
            item.name,
            item.description,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleted,
            item.toppingList
          )
        );
      }
    },
    /**
     * ユーザーが五十音順で商品の並び替えをする.
     * @param state
     */
    sortByName(state) {
      state.itemList.sort(function (before: Item, after: Item) {
        return before.name.localeCompare(after.name, "ja");
      });
    },
    /**
     * ユーザーが料金を低い順に商品の並び替えをする.
     * @param state
     */
    sortByDescPrice(state) {
      state.itemList.sort(function (before: Item, after: Item) {
        //ある順序の基準において a が b より小
        if (after.priceM > before.priceM) {
          return -1;
        }
        //その順序の基準において a が b より大
        if (after.priceM < before.priceL) {
          return 1;
        }
        // a と b が等しい場合
        return 0;
      });
    },
    /**
     * ユーザーが料金を高い順に商品の並び替えをする.
     * @param state
     */
    sortByAscPrice(state) {
      state.itemList.sort(function (before: Item, after: Item) {
        //ある順序の基準において a が b より小
        if (after.priceM < before.priceM) {
          return -1;
        }
        //その順序の基準において a が b より大
        if (after.priceM > before.priceL) {
          return 1;
        }
        // a と b が等しい場合
        return 0;
      });
    },

    /**
     * 商品をカートに入れる.
     *
     * @param state - ステート
     * @param payload - ペイロード
     */
    putInCart(state, payload) {
      const orderItemIDLength = state.userOrderInfo.orderItemList.length;
      const orderToppingList = new Array<OrderTopping>();
      for (let i = 0; i < payload.topping.length; i++) {
        orderToppingList.push(
          new OrderTopping(
            i,
            payload.topping[i].id,
            orderItemIDLength + 1,
            payload.topping[i]
          )
        );
      }
      const orderItem = new OrderItem(
        orderItemIDLength + 1,
        payload.item.id,
        state.userOrderInfo.id,
        payload.quantity,
        payload.size,
        payload.item,
        orderToppingList
      );
      state.userOrderInfo.orderItemList.push(orderItem);
    },

    resetUserOrderInfo(state) {
      state.userOrderInfo.id++;
      state.userOrderInfo.status = 0;
      state.userOrderInfo.totalPrice = 0;
      state.userOrderInfo.orderDate = new Date();
      state.userOrderInfo.deliveryTime = new Date();
      state.userOrderInfo.paymentMethod = 0;
      state.userOrderInfo.orderItemList = Array<OrderItem>();
    },
  }, //end of mutations

  getters: {
    /**
     * ログイン状態を返す.
     *
     * @param state ステート
     * @returns ture=ログイン状態、false=ログアウト状態
     */
    getLogStatus(state) {
      return state.logStatus;
    },
    /**
     * 注文情報を取得.
     *
     * @param state - ステート
     * @returns 注文情報
     */
    getUserOrderInfo(state) {
      return state.userOrderInfo;
    },
    /**
     * 全商品一覧を返す.
     *
     * @param state ステート
     * @returns 商品一覧情報
     */
    getItemList(state) {
      return state.itemList;
    },
    /**
     * 商品を名前で部分一致検索をする.
     *
     * @param state ステート
     * @return 部分一致検索で検索された商品一覧情報
     */
    getSearchedItemList(state) {
      return (name: string) => {
        return state.itemList.filter(
          (item) =>
            item.name.includes(name.toUpperCase()) || item.name.includes(name)
        );
      };
    },
    /**
     * 商品一覧をIDで絞り込む.
     *
     * @param state - ステート
     * @returns 商品一覧を絞りこむメソッド
     */
    getSearchedItemListById(state) {
      return (id: number) => {
        return state.itemList.filter((item) => item.id === Number(id))[0];
      };
    },
    /**
     *  商品数を返す.
     * @param state ステート
     * @returns 商品数
     */
    getItemCount(state) {
      return state.totalItemCount;
    },

    /**
     * ログインユーザー情報を返す.
     * @param state -state
     * @returns -ログインユーザー情報
     */
    getUserLoginInfo(state) {
      return state.userOrderInfo.user;
    },
    /**
     * 商品一覧をカテゴリー別に表示する
     * @param state
     * @returns idで絞り込んだ商品一覧
     */
    getItemlistSortByCategory(state) {
      return (idArray: Array<number>) => {
        const ItemlistSortByCategory = new Array<Item>();
        for (const id of idArray) {
          ItemlistSortByCategory.push(
            state.itemList.filter((item) => item.id === id)[0]
          );
        }
        return ItemlistSortByCategory;
      };
    },
  }, //end of getters
  modules: {},
  // `createPersistedState()`でインスタンス作成。引数に設定を書く
  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vuex",
      // 管理対象のステートを指定
      paths: ["logStatus"],
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ],
});
