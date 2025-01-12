import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
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
  }),
  getters: {},
  actions: {
    changeIngredientQuantity(currentIngred, increment = 1) {
      this.ingredientItems = this.ingredientItems.map((ingred) => {
        return ingred.id == currentIngred.id
          ? { ...ingred, quantity: ingred.quantity + increment }
          : { ...ingred };
      });
    },
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
