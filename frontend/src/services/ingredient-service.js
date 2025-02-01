import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/ingredients";

class IngredientService extends HttpClient {
  async getIngredients() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new IngredientService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
