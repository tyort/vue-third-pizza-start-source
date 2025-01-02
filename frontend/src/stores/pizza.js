import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    id: 0,
    name: "string",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    quantity: 0,
    orderId: 0,
    ingredients: [
      {
        id: 0,
        pizzaId: 0,
        ingredientId: 0,
        quantity: 0,
      },
    ],
  }),
  getters: {},
  actions: {},
});
