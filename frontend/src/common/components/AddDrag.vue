<template>
  <!-- Определяем здесь какой ингредиент перемещается -->
  <!-- 
  :draggable="boolean" -- элемент перетаскиваемый или нет;
  @dragstart.self -- событие, которое возникает, если элемент начинает перетаскиваться. НО только сам элемент, а не его дочерние компоненты;
  dragover — это событие, которое происходит когда элемент находится над областью, куда он может быть перетащен;
  dragenter — это событие, которое возникает, когда перетаскиваемый элемент входит в область другого элемента.
   -->
  <li
    :draggable="true"
    @dragstart.stop="onDragStart"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </li>
</template>

<script setup>
const props = defineProps({
  transferedData: {
    type: Object,
    required: true,
  },
});

function onDragStart(dragEvt) {
  // dragEvt -- браузерное событие DragEvent;
  // dataTransfer -- информация о переносимом объекте
  const { dataTransfer } = dragEvt;
  // dropEffect: Это свойство определяет визуальный эффект, который будет показан пользователю во время перетаскивания, когда он находится над областью, куда можно сбросить данные
  // effectAllowed: Это свойство определяет, какие действия разрешены при перетаскивании данных. Оно влияет на значение dropEffect, которое будет установлено при сбрасывании
  dataTransfer.setData("payload", JSON.stringify(props.transferedData));
}
</script>
