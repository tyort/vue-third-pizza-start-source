import { defineStore } from "pinia";
import ordersJSON from "@/mocks/orders.json";

export const useCartStore = defineStore("cart", {
  state: () => ({
    orders: [],
  }),
  getters: {},
  actions: {
    async fetchOrders() {
      this.orders = ordersJSON;
    },
  },
});
