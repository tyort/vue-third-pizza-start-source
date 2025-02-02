import { defineStore } from "pinia";
import { toRaw } from "vue";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/normalize";
import {
  doughService,
  ingredientService,
  sauceService,
  sizeService,
} from "@/services";

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
      const doughs = await doughService.getDoughs();
      this.doughItems = doughs.map(normalizeDough);
    },
    async fetchIngredients() {
      const ingreds = await ingredientService.getIngredients();
      this.ingredientItems = ingreds.map(normalizeIngredients);
    },
    async fetchSauces() {
      const sauces = await sauceService.getSauces();
      this.sauceItems = sauces.map(normalizeSauces);
    },
    async fetchSizes() {
      const sizes = await sizeService.getSizes();
      this.sizeItems = sizes.map(normalizeSize);
    },
  },
});
