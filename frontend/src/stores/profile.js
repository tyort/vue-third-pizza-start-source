import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
import resources from "@/services/resources";
import jwtService from "@/services/jwt/jwt.service";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
    userData: null,
  }),
  getters: {},
  actions: {
    async whoami() {
      resources.auth.setAuthHeader(jwtService.getToken());
      const { __state, data } = await resources.auth.whoami();
      if (__state == "success") {
        this.userData = data;
      }
    },
    async login(params) {
      const res = await resources.auth.login(params);
      if (res.__state == "success") {
        jwtService.saveToken(res.data.token);
      }
      return res;
    },
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
      this.addresses = addressesJSON;
    },
  },
});
