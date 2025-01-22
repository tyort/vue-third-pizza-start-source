import { toRaw } from "vue";
import { defineStore } from "pinia";
import { usePizzaStore } from "./pizza";
import miscJSON from "@/mocks/misc.json";
import ordersJSON from "@/mocks/orders.json";
import { normalizeMisc } from "@/common/normalize";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),
  getters: {
    isOrderPlacingAcceptable: (state) => {
      const emptyLines = Object.entries(state.address).filter(
        ([property, value]) =>
          !["comment", "flat"].includes(property) && value.trim() == ""
      );
      return (
        state.phone.match(/^(\+7|8)[0-9]{10}$/gi) &&
        emptyLines.length === 0 &&
        state.getOrderPrice !== 0
      );
    },
    getOrderPrice: (state) => {
      const miscsPricesSum = state.misc.reduce(
        (commonPrice, misc) => commonPrice + misc.price * misc.quantity,
        0
      );
      return state.pizzas.reduce(
        (commonPrice, pizza) => commonPrice + pizza.price * pizza.quantity,
        miscsPricesSum
      );
    },
  },
  actions: {
    async fetchMisc() {
      this.misc = miscJSON.map(normalizeMisc);
    },
    async fetchOrders() {
      this.orders = ordersJSON;
    },
    updateMisc(currentMisc, increment) {
      this.misc = this.misc.map((item) =>
        item.id == currentMisc.id
          ? { ...item, quantity: item.quantity + increment }
          : { ...item }
      );
    },
    putPizzaToCart() {
      const pizzaStore = usePizzaStore();
      const pizzaData = {
        name: pizzaStore.name,
        sauceId: pizzaStore.sauceId,
        doughId: pizzaStore.doughId,
        sizeId: pizzaStore.sizeId,
        ingredients: pizzaStore.ingredients,
        price: pizzaStore.getFinalPizzaPrice,
      };

      if (pizzaStore.id) {
        this.pizzas = this.pizzas.map((pizza) =>
          pizza.id == pizzaStore.id
            ? {
                ...pizza,
                ...pizzaData,
              }
            : { ...pizza }
        );
      } else {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
        });
      }

      this.pizzas = this.pizzas.map((pizza, index) =>
        toRaw({ ...pizza, id: index + 1 })
      );
      pizzaStore.$reset();
    },
    changePizzaQuantity({ id }, increment) {
      this.pizzas = this.pizzas
        .map((pizza) =>
          pizza.id == id
            ? { ...pizza, quantity: pizza.quantity + increment }
            : { ...pizza }
        )
        .filter(({ quantity }) => quantity > 0);
    },
  },
});
