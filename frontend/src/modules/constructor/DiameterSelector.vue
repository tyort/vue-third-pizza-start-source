<template>
  <label
    class="diameter__input"
    :class="`diameter__input--${pizzaSizeData.value}`"
  >
    <input
      type="radio"
      name="diameter"
      :value="pizzaSizeData.value"
      class="visually-hidden"
    />
    <span>{{ pizzaSizeData.name }}</span>
  </label>
</template>

<script setup>
defineProps({
  pizzaSizeData: {
    type: Object,
    required: true,
  },
});
</script>
