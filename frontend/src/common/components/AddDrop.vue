<template>
  <!-- stop — предотвращает фазу bubbling события в DOM. -->
  <div @drop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup>
// создаем пользовательские события
const emit = defineEmits(["drop"]);

function onDrop() {
  console.log("onDrop was called");
  // для возможности использования события родительским компонентом
  emit("drop");
}
</script>
