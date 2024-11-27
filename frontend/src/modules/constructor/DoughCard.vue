<template>
  <label class="dough__input" :class="`dough__input--${doughData.value}`">
    <input
      type="radio"
      name="dough"
      :value="doughData.value"
      class="visually-hidden"
      checked
    />
    <b>{{ doughData.name }}</b>
    <span>{{ doughData.description }}</span>
  </label>
</template>

<script setup>
defineProps({
  doughData: {
    type: Object,
    required: true,
  },
});
</script>
