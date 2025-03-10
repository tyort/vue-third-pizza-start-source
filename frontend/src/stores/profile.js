import { defineStore } from "pinia";
import resources from "@/services/resources";
import jwtService from "@/services/jwt/jwt.service";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
    orders: [],
    userData: null,
  }),
  getters: {},
  actions: {
    async whoami() {
      resources.auth.setAuthHeader(jwtService.getToken());
      const { __state, data } = await resources.auth.whoami();
      if (__state != "success") return;
      this.userData = data;
      await this.fetchAddresses();
      await this.fetchOrders();
    },
    async login(params) {
      const res = await resources.auth.login(params);
      if (res.__state == "success") {
        jwtService.saveToken(res.data.token);
      }
      return res;
    },
    async logout() {
      await resources.auth.logout();
      jwtService.destroyToken();
      resources.auth.setAuthHeader("");
      this.userData = null;
      this.addresses = [];
    },
    async fetchAddresses() {
      const { __state, data } = await resources.address.getAddresses();
      if (__state == "success") {
        this.addresses = data;
      } else {
        await this.logout();
      }
    },
    async fetchOrders() {
      const { __state, data } = await resources.order.getOrders();
      if (__state == "success") {
        this.orders = data;
      } else {
        await this.logout();
      }
    },
    async addAddress(data) {
      return await resources.address.addAddress({
        ...data,
        userId: this.userData.id,
      });
    },
    async updateAddress(data) {
      return await resources.address.updateAddress(data);
    },
  },
});
