<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <section v-for="order in orders" :key="order.id" class="sheet order">
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #{{ order.id }}</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: {{ order.price }} ₽</span>
        </div>

        <div class="order__button">
          <button
            type="button"
            class="button button--border"
            @click="profileStore.deleteOrder(order.id)"
          >
            Удалить
          </button>
        </div>
        <div class="order__button">
          <button
            type="button"
            class="button"
            @click="onButtonClick($event, order)"
          >
            Повторить
          </button>
        </div>
      </div>

      <ul class="order__list">
        <li
          v-for="pizza in order.orderPizzas"
          :key="pizza.id"
          class="order__item"
        >
          <div class="product">
            <img
              src="@/assets/img/product.svg"
              class="product__img"
              width="56"
              height="56"
              :alt="pizza.name"
            />
            <div class="product__text">
              <h2>{{ pizza.name }}</h2>
              <render :pizza="pizza" />
            </div>
          </div>

          <p class="order__price">
            {{ getQuantityText(pizza.quantity) }}{{ pizza.price }} ₽
          </p>
        </li>
      </ul>

      <ul class="order__additional">
        <li v-for="misc in order.orderMisc" :key="misc.id">
          <img :src="misc.image" width="20" height="30" :alt="misc.name" />
          <p>
            <span>{{ misc.name }}</span>
            <b>{{ getQuantityText(misc.quantity) }}{{ misc.price }} ₽</b>
          </p>
        </li>
      </ul>

      <p class="order__address">
        Адрес доставки: {{ getAddressText(order.orderAddress) }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { h, computed } from "vue";
import { useProfileStore, useDataStore, useCartStore } from "@/stores";
import { useRouter } from "vue-router";

const GET_MYSELF_VALUE = 2;

const router = useRouter();
const profileStore = useProfileStore();
const dataStore = useDataStore();
const cartStore = useCartStore();
void dataStore.fetchMisc();

const orders = computed(() => {
  return profileStore.orders.map((order) => {
    const orderMisc = order.orderMisc
      .map((misc) => {
        const miscDataStore = dataStore.miscItems.find(
          ({ id }) => id == misc.miscId
        );
        return {
          ...misc,
          price: miscDataStore?.price || 0,
          name: miscDataStore?.name || "",
          image: miscDataStore?.image || "",
        };
      })
      .filter((misc) => misc.quantity > 0);

    const orderPizzas =
      Array.isArray(order.orderPizzas) &&
      order.orderPizzas.map((pizza) => ({
        ...pizza,
        price: dataStore.getFinalPizzaPrice(
          pizza.sizeId,
          pizza.doughId,
          pizza.sauceId,
          pizza.ingredients
        ),
      }));

    const price = dataStore.getOrderPrice(orderMisc, orderPizzas);
    return { ...order, orderPizzas, orderMisc, price };
  });
});

const render = ({ pizza }) => {
  const currentSauce = dataStore.getSauceData(pizza.sauceId);
  const currentDough = dataStore.getDoughData(pizza.doughId);
  const doughText =
    currentDough.value === "large" ? "на толстом тесте" : "на тонком тесте";
  const currentSize = dataStore.getSizeData(pizza.sizeId);

  const currentIngredients = pizza.ingredients
    .map((ingred) => dataStore.getIngredientData(ingred.ingredientId))
    .reduce(
      (finalText, addition, index) =>
        `${finalText}${index === 0 ? ":" : ","} ${addition.name}`,
      ""
    );

  return h("ul", [
    h("li", `${currentSize.name}, ${doughText}`),
    h("li", `Coус: ${currentSauce.name}`),
    h("li", `Начинка${currentIngredients}`),
  ]);
};

const onButtonClick = (_evt, order) => {
  cartStore.$patch((state) => {
    state.pizzas = order.orderPizzas;
    state.misc = order.orderMisc;
    state.phone = order.phone;
  });

  if (order.addressId) {
    cartStore.updateDeliveryMethod(undefined, order.addressId);
  } else {
    cartStore.updateDeliveryMethod(GET_MYSELF_VALUE);
  }
  router.push({ path: `/cart` });
};

const getQuantityText = (amount) => {
  return amount == 1 ? "" : `${amount}x`;
};
const getAddressText = (data) => {
  const street = data?.street ? `ул. ${data.street}, ` : "";
  const building = data?.building ? `д. ${data.building}, ` : "";
  const flat = data?.flat ? `кв. ${data.flat}.` : "без квартиры.";
  return street + building + flat;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
