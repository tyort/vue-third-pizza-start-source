<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <dough-selector />
        <diameter-selector />
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <sauce-selector />
              <ingredients-selector />
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
          <pizza-constructor />
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
import { toRaw, computed } from "vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import DoughSelector from "../modules/constructor/DoughSelector.vue";
import DiameterSelector from "../modules/constructor/DiameterSelector.vue";
import SauceSelector from "../modules/constructor/SauceSelector.vue";
import PizzaConstructor from "../modules/constructor/PizzaConstructor.vue";
import { useDataStore, usePizzaStore } from "@/stores";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();

const getFinalPizzaPrice = computed(() => {
  const sizeFactor =
    dataStore.sizeItems.find((size) => size.id == pizzaStore.sizeId)
      ?.multiplier || 1;

  const doughPrice =
    dataStore.doughItems.find((dough) => dough.id == pizzaStore.doughId)
      ?.price || 0;

  const saucePrice =
    dataStore.sauceItems.find((sauce) => sauce.id === pizzaStore.sauceId)
      ?.price || 0;

  const ingredientsPrice = dataStore.ingredientItems
    .map((ingred) => {
      const { price, quantity } = toRaw(ingred);
      return price * quantity || 0;
    })
    .reduce((finalPrice, price) => finalPrice + price, 0);

  return sizeFactor * (doughPrice + saucePrice + ingredientsPrice);
});
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
