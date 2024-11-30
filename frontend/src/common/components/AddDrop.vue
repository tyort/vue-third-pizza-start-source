<template>
  <!-- stop — предотвращает фазу bubbling события в DOM. -->
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup>
// создаем пользовательские события
const emit = defineEmits(["drop"]);

function onDrop({ dataTransfer }) {
  if (!dataTransfer) {
    return;
  }

  // пользовательский параметр, который мы придумали сами
  const payload = dataTransfer.getData("payload");
  if (payload) {
    const transferData = JSON.parse(payload);
    // без этого не получится использовать этот пропс у родителя
    // transferData попадет в родительский колбэк в качестве $event
    emit("drop", transferData);
  }
}
</script>
