import { defineStore } from "pinia";
import { useDataStore } from "./data";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    quantity: 0,
  }),
  getters: {
    getFinalPizzaPrice: (state) => {
      const dataStore = useDataStore();

      const sizeFactor =
        dataStore.sizeItems.find((size) => size.id == state.sizeId)
          ?.multiplier || 1;

      const doughPrice =
        dataStore.doughItems.find((dough) => dough.id == state.doughId)
          ?.price || 0;

      const saucePrice =
        dataStore.sauceItems.find((sauce) => sauce.id === state.sauceId)
          ?.price || 0;

      const ingredientsPrice = dataStore.ingredientItems
        .map(({ price, quantity }) => price * quantity || 0)
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
