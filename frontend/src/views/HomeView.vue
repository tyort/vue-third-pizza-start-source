<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <dough-selector
          v-model="pizzaStore.doughId"
          :doughs="dataStore.doughItems"
        />
        <diameter-selector
          v-model="pizzaStore.sizeId"
          :diameters="dataStore.sizeItems"
        />
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <sauce-selector
                v-model="pizzaStore.sauceId"
                :sauces="dataStore.sauceItems"
              />
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
          <pizza-constructor
            :ingredients="pizzaStore.ingredients"
            :current-dough="
              dataStore.getDoughData(pizzaStore.doughId)?.value || 'large'
            "
            :current-sauce="
              dataStore.getSauceData(pizzaStore.sauceId)?.value || 'tomato'
            "
            :on-drop="pizzaStore.updateIngredients"
          />
          <div class="content__result">
            <p>Итого: {{ pizzaStore.getFinalPizzaPrice }} ₽</p>
            <button
              type="button"
              class="button"
              :disabled="isButtonDisabled"
              @click="onButtonClick"
            >
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
import { useRouter } from "vue-router";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import DoughSelector from "../modules/constructor/DoughSelector.vue";
import DiameterSelector from "../modules/constructor/DiameterSelector.vue";
import SauceSelector from "../modules/constructor/SauceSelector.vue";
import PizzaConstructor from "../modules/constructor/PizzaConstructor.vue";
import { usePizzaStore, useCartStore, useDataStore } from "@/stores";

const router = useRouter();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();
const dataStore = useDataStore();

const isButtonDisabled = computed(() => {
  return (
    [pizzaStore.sauceId, pizzaStore.doughId, pizzaStore.sizeId].includes(0) ||
    pizzaStore.ingredients.length === 0 ||
    !pizzaStore.name.trim()
  );
});

// pizzaStore.$subscribe(() => {
//   console.log(pizzaStore.ingredients);
//   console.log(pizzaStore.updateIngredients);
// });

const onButtonClick = () => {
  cartStore.putPizzaToCart();
  router.push({ path: `/cart` });
};
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
