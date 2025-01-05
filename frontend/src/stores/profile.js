import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
import userJSON from "@/mocks/user.json";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: addressesJSON,
    userData: {},
  }),
  getters: {},
  actions: {
    async fetchUserData() {
      this.userData = userJSON;
    },
  },
});
