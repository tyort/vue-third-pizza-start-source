import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/orders";

class OrderService extends HttpClient {
  async deleteOrder(id) {
    try {
      this.delete(`/${id}`);
    } catch (err) {
      throw Error(err);
    }
  }
  async postOrder(data) {
    try {
      return this.post("/", { data });
    } catch (err) {
      throw Error(err);
    }
  }
  async getOrders() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new OrderService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
