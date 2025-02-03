import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
import resources from "@/services/resources";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
    userData: null,
  }),
  getters: {},
  actions: {
    async fetchUserData() {
      console.log("кто я такой?");
    },
    async login(params) {
      return await resources.auth.login(params);
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
