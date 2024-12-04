<template>
  <app-drop class="content__constructor" @drop="setIngredient">
    <div class="pizza" :class="setSauceAndDough">
      <div class="pizza__wrapper">
        <div
          v-for="ingredient in ingredients"
          :key="ingredient.value"
          class="pizza__filling"
          :class="`pizza__filling--${ingredient.value}`"
        ></div>
      </div>
    </div>
  </app-drop>
</template>

<script setup>
import { computed } from "vue";
import AppDrop from "../../common/components/AddDrop.vue";
const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
  sauceAndDough: {
    type: Object,
    required: true,
  },
});

const setSauceAndDough = computed(() => {
  switch (`${props.sauceAndDough.dough}${props.sauceAndDough.sauce}`) {
    case "largecreamy":
      return "pizza--foundation--big-creamy";
    case "largetomato":
      return "pizza--foundation--big-tomato";
    case "lighttomato":
      return "pizza--foundation--small-creamy";
    default:
      return "pizza--foundation--small-tomato";
  }
});

const emit = defineEmits(["changeIngredientAmount"]);

function setIngredient(ingred) {
  if (ingred.amount < 3) {
    emit("changeIngredientAmount", { ...ingred, amount: ++ingred.amount });
  }
}
</script>
