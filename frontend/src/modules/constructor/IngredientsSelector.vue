<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        v-for="ingredient in dataStore.ingredientItems"
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
          <ingredients-selector-button
            :class-addition="'minus'"
            :disabled="ingredient.quantity === 0"
            @click="dataStore.changeIngredientQuantity(ingredient, -1)"
          >
            Меньше
          </ingredients-selector-button>
          <ingredients-selector-count
            :ingredient-amount="ingredient.quantity"
          />
          <ingredients-selector-button
            :class-addition="'plus'"
            :disabled="ingredient.quantity === 3"
            @click="dataStore.changeIngredientQuantity(ingredient, 1)"
          >
            Больше
          </ingredients-selector-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppDrag from "../../common/components/AddDrag.vue";
import IngredientsSelectorButton from "./IngredientsSelectorButton.vue";
import IngredientsSelectorCount from "./IngredientsSelectorCount.vue";
import { getImage } from "../../common/helpers/normalize";
import { useDataStore } from "@/stores";

const dataStore = useDataStore();
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
