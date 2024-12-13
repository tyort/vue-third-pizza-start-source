<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "./AppLayoutDefault.vue";

// для получения информации о текущем маршруте и его параметрах
const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        const component = await import(`./${meta.layout}.vue`);
        layout.value = component?.default || AppLayoutDefault;
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch (err) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        err
      );
      layout.value = AppLayoutDefault;
    }
  }
);
</script>
