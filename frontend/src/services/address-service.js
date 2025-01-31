import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/addresses";

class AddressService extends HttpClient {
  async putAddress(data) {
    try {
      return this.put(`/${data.id}`, { data });
    } catch (err) {
      throw Error(err);
    }
  }
  async deleteAddress(id) {
    try {
      this.delete(`/${id}`);
    } catch (err) {
      throw Error(err);
    }
  }
  async postAddress(data) {
    try {
      return this.post("/", { data });
    } catch (err) {
      throw Error(err);
    }
  }
  async getAddresses() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new AddressService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
