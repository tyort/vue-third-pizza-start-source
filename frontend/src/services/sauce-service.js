import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/sauces";

class SauceService extends HttpClient {
  async getSauces() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new SauceService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
