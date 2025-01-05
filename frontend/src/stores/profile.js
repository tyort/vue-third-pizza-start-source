import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
import userJSON from "@/mocks/user.json";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
    userData: {},
  }),
  getters: {},
  actions: {
    async fetchUserData() {
      // {
      //   "id": "string",
      //   "name": "string",
      //   "email": "string",
      //   "avatar": "string",
      //   "phone": "string"
      // }
      this.userData = userJSON;
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
