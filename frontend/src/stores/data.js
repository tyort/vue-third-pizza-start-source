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
    doughItems: doughJSON.map(normalizeDough),
    ingredientItems: ingredientsJSON.map(normalizeIngredients),
    sauceItems: saucesJSON.map(normalizeSauces),
    sizeItems: sizesJSON.map(normalizeSize),
  }),
  getters: {},
  actions: {},
});
