import { toRaw } from "vue";
import { defineStore } from "pinia";
import { usePizzaStore, useProfileStore } from "@/stores/index";
import { normalizeMisc } from "@/common/normalize";
import resources from "@/services/resources";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),
  getters: {
    isOrderPlacingAcceptable: (state) => {
      const emptyLines = Object.entries(state.address).filter(
        ([property, value]) =>
          !["comment", "flat"].includes(property) && value.trim() == ""
      );
      return (
        state.phone.match(/^(\+7|8)[0-9]{10}$/gi) &&
        emptyLines.length === 0 &&
        state.getOrderPrice !== 0
      );
    },
    getOrderPrice: (state) => {
      const miscsPricesSum = state.misc.reduce(
        (commonPrice, misc) => commonPrice + misc.price * misc.quantity,
        0
      );
      return state.pizzas.reduce(
        (commonPrice, pizza) => commonPrice + pizza.price * pizza.quantity,
        miscsPricesSum
      );
    },
  },
  actions: {
    async fetchMisc() {
      const { data } = await resources.misc.getMisc();
      this.misc = data.map(normalizeMisc);
    },
    async createOrder() {
      const profileStore = useProfileStore();
      const pizzas = this.pizzas.map(
        ({
          name,
          sauceId,
          doughId,
          sizeId,
          quantity,
          ingredients: unparsedData,
        }) => {
          const ingredients = unparsedData.map(
            ({ ingredientId, quantity }) => ({
              ingredientId,
              quantity,
            })
          );
          return {
            name,
            sauceId,
            doughId,
            sizeId,
            quantity,
            ingredients,
          };
        }
      );
      const misc = this.misc.map(({ id, quantity }) => ({
        quantity,
        miscId: id,
      }));

      return resources.order.createOrder({
        userId: profileStore.userData?.id || null,
        phone: this.phone,
        address: toRaw(this.address),
        pizzas,
        misc,
      });
    },
    updateMisc(currentMisc, increment) {
      this.misc = this.misc.map((item) =>
        item.id == currentMisc.id
          ? { ...item, quantity: item.quantity + increment }
          : { ...item }
      );
    },
    putPizzaToCart() {
      const pizzaStore = usePizzaStore();
      const pizzaData = {
        name: pizzaStore.name,
        sauceId: pizzaStore.sauceId,
        doughId: pizzaStore.doughId,
        sizeId: pizzaStore.sizeId,
        ingredients: pizzaStore.ingredients,
        price: pizzaStore.getFinalPizzaPrice,
      };

      if (pizzaStore.id) {
        this.pizzas = this.pizzas.map((pizza) =>
          pizza.id == pizzaStore.id
            ? {
                ...pizza,
                ...pizzaData,
              }
            : { ...pizza }
        );
      } else {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
        });
      }

      this.pizzas = this.pizzas.map((pizza, index) =>
        toRaw({ ...pizza, id: index + 1 })
      );
      pizzaStore.$reset();
    },
    changePizzaQuantity({ id }, increment) {
      this.pizzas = this.pizzas
        .map((pizza) =>
          pizza.id == id
            ? { ...pizza, quantity: pizza.quantity + increment }
            : { ...pizza }
        )
        .filter(({ quantity }) => quantity > 0);
    },
  },
});
