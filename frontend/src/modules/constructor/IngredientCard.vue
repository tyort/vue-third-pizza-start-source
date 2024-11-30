<template>
  <app-drag class="ingredients__item" :transfered-data="ingredientData">
    <div class="filling">
      <img :src="getImage(ingredientData.image)" :alt="ingredientData.name" />
      {{ ingredientData.name }}
    </div>
    <div class="counter counter--orange ingredients__counter">
      <ingredient-card-button
        :class-addition="'minus'"
        :disabled="count === 0"
        @click="onClick($event, -1)"
      >
        Меньше
      </ingredient-card-button>
      <ingredient-card-count :ingredient-amount="count" />
      <ingredient-card-button
        :class-addition="'plus'"
        :disabled="count === 3"
        @click="onClick($event, 1)"
      >
        Больше
      </ingredient-card-button>
    </div>
  </app-drag>
</template>

<script setup>
import { ref } from "vue";
import AppDrag from "../../common/components/AddDrag.vue";
import IngredientCardButton from "./IngredientCardButton.vue";
import IngredientCardCount from "./IngredientCardCount.vue";
import { getImage } from "../../common/helpers/normalize";

defineProps({
  ingredientData: {
    type: Object,
    required: true,
  },
});

const count = ref(0);
const onClick = (_event, point) => {
  count.value = count.value + point;
};
</script>

<!-- <style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds-colors.scss";
@import "@/assets/scss/ds-system/ds-shadows.scss";
@import "@/assets/scss/ds-system/ds-typography.scss";
@import "@/assets/scss/mixins/m_center.scss";

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

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style> -->
