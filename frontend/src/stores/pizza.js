import { defineStore } from "pinia";
import { useDataStore } from "./data";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    id: 0,
    name: "string",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    quantity: 0,
    orderId: 0,
    ingredients: [
      {
        ingredientId: 0,
        quantity: 0,
      },
    ],
  }),
  getters: {
    getFinalPizzaPrice: (state) => {
      const data = useDataStore();

      const sizeFactor = data.sizeItems.find(
        (size) => size.id === state.sizeId
      ).multiplier;

      const doughPrice = data.doughItems.find(
        (dough) => dough.id === state.doughId
      ).price;

      const saucePrice = data.sauceItems.find(
        (sauce) => sauce.id === state.sauceId
      ).price;

      const ingredientsPrice = data.ingredientItems
        .map(({ price, quantity }) => price * quantity)
        .reduce((finalPrice, price) => finalPrice + price, 0);

      return sizeFactor * (doughPrice + saucePrice + ingredientsPrice);
    },
  },
  actions: {
    changePizzaSize(sizeId) {
      this.sizeId = sizeId;
    },
    changeDough(doughId) {
      this.doughId = doughId;
    },
    changeSauce(sauceId) {
      this.sauceId = sauceId;
    },
  },
});
