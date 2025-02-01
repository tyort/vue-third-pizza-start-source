import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/dough";

class DoughService extends HttpClient {
  async getDoughs() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new DoughService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
