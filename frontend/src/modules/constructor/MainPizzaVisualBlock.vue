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

const emit = defineEmits(["updateIngredients", "changeIngredientAmount"]);

function setIngredient(ingred) {
  // Все отображаемые ингредиенты;
  const currentIngredients = props.ingredients;
  const isAlreadyExists = currentIngredients.some(
    // eslint-disable-next-line prettier/prettier
    ({ id }) => Number(id) === Number(ingred.id)
  );

  if (!isAlreadyExists || currentIngredients.length === 0) {
    currentIngredients.push(ingred);
    emit("updateIngredients", currentIngredients);
  }

  if (ingred.amount < 3) {
    emit("changeIngredientAmount", { ...ingred, amount: ++ingred.amount });
  }
}
</script>
