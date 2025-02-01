import { defineStore } from "pinia";
import { toRaw } from "vue";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/normalize";
import { doughService } from "@/services";

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
      // [
      //   {
      //     id: 0,
      //     name: "string",
      //     image: "string",
      //     price: 0,
      //   },
      // ];
      this.ingredientItems = ingredientsJSON.map(normalizeIngredients);
    },
    async fetchSauces() {
      // [
      //   {
      //     id: 0,
      //     name: "string",
      //     price: 0,
      //   },
      // ];
      this.sauceItems = saucesJSON.map(normalizeSauces);
    },
    async fetchSizes() {
      this.sizeItems = sizesJSON.map(normalizeSize);
    },
  },
});
