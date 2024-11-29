<template>
  <div class="content__constructor">
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
  </div>
</template>

<script setup>
defineProps({
  ingredients: {
    type: Object,
    required: true,
  },
});
</script>
