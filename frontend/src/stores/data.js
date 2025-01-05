import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import addressesJSON from "@/mocks/addresses.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughItems: doughJSON.map(normalizeDough),
    ingredientItems: ingredientsJSON.map(normalizeIngredients),
    sauceItems: saucesJSON.map(normalizeSauces),
    sizeItems: sizesJSON.map(normalizeSize),
    addressesItems: [],
  }),
  getters: {},
  actions: {
    async fetchAddresses() {
      // [
      //   {
      //     id: 0,
      //     name: "string",
      //     street: "string",
      //     building: "string",
      //     flat: "string",
      //     comment: "string",
      //     userId: "string",
      //   },
      // ];
      this.addressesItems = addressesJSON;
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
      this;
    },
  },
});
