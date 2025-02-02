import { defineStore } from "pinia";
import { toRaw } from "vue";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/normalize";
import resources from "@/services/resources";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughItems: [],
    ingredientItems: [],
    sauceItems: [],
    sizeItems: [],
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
  },
  actions: {
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
  },
});
