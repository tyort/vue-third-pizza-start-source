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
              v-model="pizzaStore.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <pizza-constructor />
          <div class="content__result">
            <p>Итого: {{ pizzaStore.getFinalPizzaPrice }} ₽</p>
            <button type="button" class="button" :disabled="isButtonDisabled">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed } from "vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import DoughSelector from "../modules/constructor/DoughSelector.vue";
import DiameterSelector from "../modules/constructor/DiameterSelector.vue";
import SauceSelector from "../modules/constructor/SauceSelector.vue";
import PizzaConstructor from "../modules/constructor/PizzaConstructor.vue";
import { usePizzaStore, useDataStore } from "@/stores";

const pizzaStore = usePizzaStore();
const dataStore = useDataStore();

const isButtonDisabled = computed(() => {
  const isIngredsUsed =
    dataStore.ingredientItems.filter(({ quantity }) => quantity > 0).length ===
    0;
  return (
    [pizzaStore.sauceId, pizzaStore.doughId, pizzaStore.sizeId].includes(0) ||
    isIngredsUsed ||
    !pizzaStore.name.trim()
  );
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
