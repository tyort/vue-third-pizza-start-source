<template>
  <label>
    <input type="radio" name="sauce" :value="sauceData.value" checked />
    <span>{{ sauceData.name }}</span>
  </label>
</template>

<script setup>
defineProps({
  sauceData: {
    type: Object,
    required: true,
  },
});
</script>
