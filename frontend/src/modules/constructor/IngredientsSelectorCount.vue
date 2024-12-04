<template>
  <input
    type="text"
    name="counter"
    class="counter__input"
    :value="ingredientAmount"
  />
</template>

<script setup>
defineProps({
  ingredientAmount: {
    type: [String, Number],
    default: 0,
    validator: (value) => value >= 0 && value <= 3,
  },
});
</script>
