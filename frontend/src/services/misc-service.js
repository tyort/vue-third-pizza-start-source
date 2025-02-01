import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/misc";

class MiscService extends HttpClient {
  async getMiscs() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new MiscService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
