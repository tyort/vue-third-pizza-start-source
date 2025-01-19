import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { toRaw } from "vue";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    id: null,
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    ingredients: [],
  }),
  getters: {
    getAllIngredientsQuantities: (state) => {
      const dataStore = useDataStore();
      const appliedIngredsIds = state.ingredients.map(({ id }) => id);
      return dataStore.ingredientItems.map((ingred) =>
        appliedIngredsIds.includes(ingred.id)
          ? {
              ...ingred,
              quantity: state.ingredients.find(({ id }) => ingred.id == id)
                .quantity,
            }
          : { ...ingred }
      );
    },
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

      const ingredientsPrice = state.ingredients
        .map(({ price, quantity }) => price * quantity || 0)
        .reduce((finalPrice, price) => finalPrice + price, 0);

      return sizeFactor * (doughPrice + saucePrice + ingredientsPrice);
    },
  },
  actions: {
    // changePizzaSize(sizeId) {
    //   this.sizeId = sizeId;
    // },
    // changeDough(doughId) {
    //   this.doughId = doughId;
    // },
    // changeSauce(sauceId) {
    //   this.sauceId = sauceId;
    // },
    updateIngredients(udatedIngred, increment = 1) {
      const existingIngred = this.ingredients.find(
        (ingred) => udatedIngred.id == ingred?.id
      );

      if (existingIngred) {
        this.ingredients = this.ingredients.map((ingred) =>
          existingIngred.id == ingred?.id
            ? { ...ingred, quantity: existingIngred.quantity + increment }
            : { ...ingred }
        );
      } else {
        this.ingredients.push({ ...udatedIngred, quantity: increment });
      }

      this.ingredients = this.ingredients
        .map((ingred) => toRaw(ingred))
        .filter(({ quantity }) => quantity > 0);
    },
  },
});
