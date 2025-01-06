import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import miscJSON from "@/mocks/misc.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughItems: [],
    ingredientItems: [],
    sauceItems: [],
    sizeItems: [],
    miscItems: [],
  }),
  getters: {},
  actions: {
    async fetchDoughs() {
      // [
      //   {
      //     id: 0,
      //     name: "string",
      //     image: "string",
      //     description: "string",
      //     price: 0,
      //   },
      // ];
      this.doughItems = doughJSON.map(normalizeDough);
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
    async fetchMisc() {
      // [
      //   {
      //     id: 0,
      //     name: "string",
      //     image: "string",
      //     price: 0,
      //   },
      // ];
      this.miscItems = miscJSON;
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
