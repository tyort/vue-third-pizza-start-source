import { defineStore } from "pinia";
import { toRaw } from "vue";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
  normalizeMisc,
} from "@/common/normalize";
import resources from "@/services/resources";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughItems: [],
    ingredientItems: [],
    sauceItems: [],
    sizeItems: [],
    miscItems: [],
  }),
  getters: {
    getSauceData: (state) => {
      return (sauceId) =>
        toRaw(state.sauceItems.find(({ id }) => sauceId == id));
    },
    getDoughData: (state) => {
      return (doughId) =>
        toRaw(state.doughItems.find(({ id }) => doughId == id));
    },
    getSizeData: (state) => {
      return (sizeId) => toRaw(state.sizeItems.find(({ id }) => sizeId == id));
    },
    getIngredientData: (state) => {
      return (ingredientId) =>
        toRaw(state.ingredientItems.find(({ id }) => ingredientId == id));
    },
  },
  actions: {
    async fetchMisc() {
      const { data } = await resources.misc.getMisc();
      this.miscItems = data.map(normalizeMisc);
    },
    async fetchDoughs() {
      const { data } = await resources.dough.getDoughs();
      this.doughItems = data.map(normalizeDough);
    },
    async fetchIngredients() {
      const { data } = await resources.ingredient.getIngredients();
      this.ingredientItems = data.map(normalizeIngredients);
    },
    async fetchSauces() {
      const { data } = await resources.sauce.getSauces();
      this.sauceItems = data.map(normalizeSauces);
    },
    async fetchSizes() {
      const { data } = await resources.size.getSizes();
      this.sizeItems = data.map(normalizeSize);
    },

    getFinalPizzaPrice(sizeId, doughId, sauceId, ingredients) {
      const sizeFactor = this.getSizeData(sizeId)?.multiplier || 1;
      const doughPrice = this.getDoughData(doughId)?.price || 0;
      const saucePrice = this.getSauceData(sauceId)?.price || 0;
      const ingredientsPrice = ingredients
        .map(({ price, quantity }) => price * quantity || 0)
        .reduce((finalPrice, price) => finalPrice + price, 0);

      return sizeFactor * (doughPrice + saucePrice + ingredientsPrice);
    },

    getOrderPrice(misc, pizzas) {
      const miscsPricesSum = misc.reduce(
        (commonPrice, misc) => commonPrice + misc.price * misc.quantity,
        0
      );
      return pizzas.reduce(
        (commonPrice, pizza) => commonPrice + pizza.price * pizza.quantity,
        miscsPricesSum
      );
    },
  },
});
