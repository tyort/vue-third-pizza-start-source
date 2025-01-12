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

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

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
</style>
