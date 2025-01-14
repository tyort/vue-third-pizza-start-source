<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        v-for="ingredient in pizzaStore.getAllIngredientsQuantities"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <app-drag
          class="filling"
          :transfered-data="ingredient"
          :draggable="ingredient.quantity < 3"
        >
          <img
            :draggable="false"
            :src="getImage(ingredient.image)"
            :alt="ingredient.name"
          />
          {{ ingredient.name }}
        </app-drag>
        <div class="counter counter--orange ingredients__counter">
          <app-increment-button
            :class-addition="'minus'"
            :disabled="ingredient.quantity === 0"
            @click="pizzaStore.updateIngredients(ingredient, -1)"
          >
            Меньше
          </app-increment-button>
          <app-increment-count :counter-indicator="ingredient.quantity" />
          <app-increment-button
            :class-addition="'plus'"
            :disabled="ingredient.quantity === 3"
            @click="pizzaStore.updateIngredients(ingredient, 1)"
          >
            Больше
          </app-increment-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppDrag from "../../common/components/AddDrag.vue";
import AppIncrementButton from "../../common/components/AppIncrementButton.vue";
import AppIncrementCount from "../../common/components/AppIncrementCount.vue";
import { getImage } from "../../common/helpers/normalize";
import { usePizzaStore } from "@/stores";

const pizzaStore = usePizzaStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__filling {
  width: 100%;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filling {
  @include r-s14-h16;
  position: relative;
  display: block;
  padding-left: 36px;

  img {
    @include p_center-v;
    display: block;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    padding: 4px;
    border-radius: 50%;
  }
}
</style>
