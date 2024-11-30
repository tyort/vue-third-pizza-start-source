<template>
  <app-drop class="content__constructor" @drop="setIngredient">
    <div class="pizza pizza--foundation--big-tomato">
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
import AppDrop from "../../common/components/AddDrop.vue";
const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
});

function setIngredient(ingred) {
  // Все отображаемые ингредиенты;
  const currentIngredients = props.ingredients;

  console.log(ingred);
}
</script>
