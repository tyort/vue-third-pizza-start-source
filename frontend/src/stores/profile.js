import { defineStore } from "pinia";
import resources from "@/services/resources";
import jwtService from "@/services/jwt/jwt.service";

const NEW_ADDRESS_VALUE = 1;
const GET_MYSELF_VALUE = 2;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
    orders: [],
    userData: null,
  }),
  getters: {
    getDeliveryMethods: (state) => {
      const userDeliveryMethods = state.addresses.map((address, index) => ({
        ...address,
        value: 3 + index,
      }));
      return [
        { name: "Новый адрес", value: NEW_ADDRESS_VALUE },
        { name: "Получу сам", value: GET_MYSELF_VALUE },
        ...userDeliveryMethods,
      ];
    }
  },
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
    async deleteOrder(id) {
      const { __state } = await resources.order.removeOrder(id);
      if (__state == "success") {
        await this.fetchOrders();
      } else {
        await this.logout();
      }
    },
    async addAddress(data) {
      const { __state } = await resources.address.addAddress({
        ...data,
        userId: this.userData.id,
      });
      if (__state == "success") {
        await this.fetchAddresses();
      } else {
        await this.logout();
      }
    },
    async updateAddress(data) {
      const { __state } = await resources.address.updateAddress(data);
      if (__state == "success") {
        await this.fetchAddresses();
      } else {
        await this.logout();
      }
    },
    async deleteAddress(id) {
      const { __state } = await resources.address.removeAddress(id);
      if (__state == "success") {
        await this.fetchAddresses();
      } else {
        await this.logout();
      }
    },
  },
});
