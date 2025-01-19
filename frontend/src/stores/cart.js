import { toRaw } from "vue";
import { defineStore } from "pinia";
import { usePizzaStore } from "./pizza";
import miscJSON from "@/mocks/misc.json";
import ordersJSON from "@/mocks/orders.json";
import { normalizeMisc } from "@/common/helpers/normalize";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [],
  }),
  getters: {},
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
      console.log(this.pizzas);

      pizzaStore.$reset();
    },
    changePizzaQuantity(currentPizza, increment) {
      this.pizzas = this.pizzas
        .map((pizza) =>
          pizza.name == currentPizza.name
            ? { ...pizza, quantity: pizza.quantity + increment }
            : { ...pizza }
        )
        .filter(({ quantity }) => quantity > 0);
    },
  },
});
