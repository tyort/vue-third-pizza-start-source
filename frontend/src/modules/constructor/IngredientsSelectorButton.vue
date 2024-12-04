<template>
  <button
    type="button"
    class="counter__button"
    :class="`counter__button--${classAddition}`"
  >
    <span class="visually-hidden"><slot /></span>
  </button>
</template>

<script setup>
defineProps({
  classAddition: {
    type: String,
    required: true,
  },
});
</script>
