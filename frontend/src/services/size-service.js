import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/sizes";

class SizeService extends HttpClient {
  async getSizes() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new SizeService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
