<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <dough-selector
          :dough-types="doughItems"
          :checked-dough="sauceAndDough.dough"
          @check-current-input="checkCurrentInput"
        />
        <diameter-selector
          v-model="currentPizzaSize"
          :pizza-sizes="sizeItems"
        />
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <sauce-selector
                :sauces="sauceItems"
                :checked-sauce="sauceAndDough.sauce"
                @check-current-input="checkCurrentInput"
              />
              <ingredients-selector
                :ingredients="allIngredientsWithAmount"
                @change-ingredient-amount="changeIngredientAmount"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <pizza-constructor
            :ingredients="currentIngredients"
            :sauce-and-dough="sauceAndDough"
            @change-ingredient-amount="changeIngredientAmount"
          />
          <div class="content__result">
            <p>Итого: {{ getFinalPizzaPrice }} ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref, toRaw, reactive, computed } from "vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import DoughSelector from "../modules/constructor/DoughSelector.vue";
import DiameterSelector from "../modules/constructor/DiameterSelector.vue";
import SauceSelector from "../modules/constructor/SauceSelector.vue";
import PizzaConstructor from "../modules/constructor/PizzaConstructor.vue";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSize);
const currentIngredients = ref([]);
const currentPizzaSize = ref("normal");
const allIngredientsWithAmount = ref(
  ingredientItems.map((ingred) => ({ ...ingred, amount: 0 }))
);

const sauceAndDough = reactive({
  sauce: "tomato",
  dough: "large",
});

const getFinalPizzaPrice = computed(() => {
  const sizeFactor = sizeItems.find(
    (size) => size.value === currentPizzaSize.value
  ).multiplier;

  const doughPrice = doughItems.find(
    (dough) => dough.value === sauceAndDough.dough
  ).price;

  const saucePrice = sauceItems.find(
    (sauce) => sauce.value === sauceAndDough.sauce
  ).price;

  const ingredientsPrice = currentIngredients.value
    .map((ingred) => {
      const { price, amount } = toRaw(ingred);
      return price * amount;
    })
    .reduce((finalPrice, price) => finalPrice + price, 0);

  return sizeFactor * (doughPrice + saucePrice + ingredientsPrice);
});

function checkCurrentInput(data) {
  for (const [key, value] of Object.entries(data)) {
    sauceAndDough[key] = value;
  }
}

function changeIngredientAmount(ingred) {
  const data = allIngredientsWithAmount.value.map((item) => {
    return Number(item.id) === Number(ingred.id)
      ? { ...ingred }
      : toRaw({ ...item });
  });
  allIngredientsWithAmount.value = data;
  currentIngredients.value = data.filter(({ amount }) => amount > 0);
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
