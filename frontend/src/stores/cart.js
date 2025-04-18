import { toRaw } from "vue";
import { defineStore } from "pinia";
import { usePizzaStore, useProfileStore, useDataStore } from "@/stores/index";
import resources from "@/services/resources";

const NEW_ADDRESS_VALUE = 1;
const GET_MYSELF_VALUE = 2;

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      id: null,
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),
  getters: {},
  actions: {
    updateDeliveryMethod(value, id) {
      const profileStore = useProfileStore();
      const deliveryMethod = profileStore.getDeliveryMethods.find((method) =>
        id ? method.id == id : method.value == value
      );

      if (deliveryMethod.value == GET_MYSELF_VALUE) {
        this.address = null;
      } else if (deliveryMethod.value == NEW_ADDRESS_VALUE) {
        this.address = {
          id: null,
          street: "",
          building: "",
          flat: "",
          comment: "",
        };
      } else {
        this.address = {
          id: deliveryMethod.id,
          street: deliveryMethod.street,
          building: deliveryMethod.building,
          flat: deliveryMethod.flat,
          comment: deliveryMethod.comment,
        };
      }
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
      const dataStore = useDataStore();

      const pizzaData = {
        name: pizzaStore.name,
        sauceId: pizzaStore.sauceId,
        doughId: pizzaStore.doughId,
        sizeId: pizzaStore.sizeId,
        ingredients: pizzaStore.ingredients,
        price: dataStore.getFinalPizzaPrice(
          pizzaStore.sizeId,
          pizzaStore.doughId,
          pizzaStore.sauceId,
          pizzaStore.ingredients
        ),
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
