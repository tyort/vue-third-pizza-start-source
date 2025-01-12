import { toRaw } from "vue";
import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { usePizzaStore } from "./pizza";
import ordersJSON from "@/mocks/orders.json";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
  }),
  getters: {},
  actions: {
    async fetchOrders() {
      this.orders = ordersJSON;
    },
    putPizzaToCart() {
      const dataStore = useDataStore();
      const pizzaStore = usePizzaStore();

      const ingredients = dataStore.ingredientItems
        .filter(({ quantity }) => quantity > 0)
        .map(({ ingredientId, quantity }) => ({
          ingredientId,
          quantity,
        }));

      this.pizzas = [
        ...this.pizzas,
        {
          name: pizzaStore.name,
          sauceId: pizzaStore.sauceId,
          doughId: pizzaStore.doughId,
          sizeId: pizzaStore.sizeId,
          quantity: 1,
          ingredients,
        },
      ].map((pizza) => toRaw(pizza));
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
