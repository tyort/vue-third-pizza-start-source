<template>
  <app-drop class="content__constructor">
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
defineProps({
  ingredients: {
    type: Object,
    required: true,
  },
});
</script>
