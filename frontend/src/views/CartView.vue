<template>
  <form method="post" class="layout-form" @submit.prevent="onSubmit">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="cartStore.pizzas.length === 0" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li
            v-for="pizza in cartStore.pizzas"
            :key="pizza.id"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
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

            <div class="counter cart-list__counter">
              <app-increment-button
                :class-addition="'minus'"
                :disabled="pizza.quantity == 0"
                @click="cartStore.changePizzaQuantity(pizza, -1)"
                >Меньше
              </app-increment-button>
              <app-increment-count :counter-indicator="pizza.quantity" />
              <app-increment-button
                class="counter__button--orange"
                :class-addition="'plus'"
                @click="cartStore.changePizzaQuantity(pizza, 1)"
              >
                Больше
              </app-increment-button>
            </div>

            <div class="cart-list__price">
              <b>{{ pizza.price * pizza.quantity }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                @click="onButtonClick($event, pizza)"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="misc in cartStore.misc"
              :key="misc.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="misc.image"
                  width="39"
                  height="60"
                  :alt="misc.name"
                />
                <span>{{ misc.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <div class="counter additional-list__counter">
                  <app-increment-button
                    :class-addition="'minus'"
                    :disabled="misc.quantity == 0"
                    @click="cartStore.updateMisc(misc, -1)"
                    >Меньше
                  </app-increment-button>
                  <app-increment-count :counter-indicator="misc.quantity" />
                  <app-increment-button
                    class="counter__button--orange"
                    :class-addition="'plus'"
                    @click="cartStore.updateMisc(misc, 1)"
                  >
                    Больше
                  </app-increment-button>
                </div>

                <div class="additional-list__price">
                  <b>× {{ misc.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
                :value="getDeliveryMethodValue"
                @input="cartStore.updateDeliveryMethod($event.target.value)"
              >
                <option
                  v-for="{ value, name } in profileStore.getDeliveryMethods"
                  :key="value"
                  :value="value"
                >
                  {{ name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                v-model="cartStore.phone"
                type="tel"
                name="tel"
                maxlength="12"
                placeholder="+7 999-999-99-99"
                required
              />
            </label>

            <div
              v-if="getDeliveryMethodValue != GET_MYSELF_VALUE"
              class="cart-form__address"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    v-model="cartStore.address.street"
                    type="text"
                    name="street"
                    required
                    :disabled="cartStore.address.id"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    v-model="cartStore.address.building"
                    type="text"
                    name="house"
                    required
                    :disabled="cartStore.address.id"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    v-model="cartStore.address.flat"
                    type="text"
                    name="apartment"
                    :disabled="cartStore.address.id"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'home' }"
          class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b
          >Итого:
          {{ dataStore.getOrderPrice(cartStore.misc, cartStore.pizzas) }} ₽</b
        >
      </div>

      <div class="footer__submit">
        <button type="submit" class="button" :disabled="!isFormValid.status">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { h, shallowRef, computed } from "vue";
import AppIncrementButton from "@/common/components/AppIncrementButton.vue";
import AppIncrementCount from "@/common/components/AppIncrementCount.vue";
import {
  useCartStore,
  useDataStore,
  usePizzaStore,
  useProfileStore,
} from "@/stores";
import { useRouter } from "vue-router";

const GET_MYSELF_VALUE = 2;
const NEW_ADDRESS_VALUE = 1;

const router = useRouter();
const cartStore = useCartStore();
const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const profileStore = useProfileStore();

void dataStore.fetchMisc();

const isFormValid = shallowRef({ status: true, message: "" });

const render = ({ pizza }) => {
  const currentSauce = dataStore.getSauceData(pizza.sauceId);
  const currentDough = dataStore.getDoughData(pizza.doughId);
  const doughText =
    currentDough.value === "large" ? "на толстом тесте" : "на тонком тесте";
  const currentSize = dataStore.getSizeData(pizza.sizeId);
  const currentIngredients = pizza.ingredients.reduce(
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

const onButtonClick = (_event, pizzaData) => {
  pizzaStore.$patch((state) => {
    state.id = pizzaData.id;
    state.name = pizzaData.name;
    state.sauceId = pizzaData.sauceId;
    state.doughId = pizzaData.doughId;
    state.sizeId = pizzaData.sizeId;
    state.ingredients = pizzaData.ingredients;
  });
  router.push("/");
};

const onSubmit = async () => {
  const res = await cartStore.createOrder();
  if (res.__state === "success") {
    await router.push({ name: "success" });
    cartStore.$reset();
  }
};

const getDeliveryMethodValue = computed(() => {
  if (cartStore.address == null) {
    return GET_MYSELF_VALUE;
  } else if (cartStore.address.id == null) {
    return NEW_ADDRESS_VALUE;
  }
  const addressData = profileStore.getDeliveryMethods.find(
    ({ id }) => cartStore.address.id == id
  );
  return addressData.value;
});

// при cartStore.$reset() почему-то не срабатывает $subscribe
cartStore.$subscribe((_mutation, state) => {
  const emptyLines =
    getDeliveryMethodValue.value != GET_MYSELF_VALUE
      ? Object.entries(state.address).filter(
          ([property, value]) =>
            !["comment", "flat", "id"].includes(property) && value.trim() == ""
        )
      : [];
  const status =
    state.phone.match(/^(\+7|8)[0-9]{10}$/gi) &&
    emptyLines.length == 0 &&
    dataStore.getOrderPrice(state.misc, state.pizzas) !== 0;
  isFormValid.value = { status, message: "" };
});

dataStore.$subscribe((mutation, state) => {
  if (mutation.events.key == "miscItems" && mutation.events.type == "set") {
    cartStore.misc = state.miscItems;
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
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

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
