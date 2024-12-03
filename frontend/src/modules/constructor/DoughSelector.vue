<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="doughData in doughTypes"
          :key="doughData.id"
          class="dough__input"
          :class="`dough__input--${doughData.value}`"
        >
          <input
            type="radio"
            name="dough"
            :value="doughData.value"
            class="visually-hidden"
            :checked="doughData.value === checkedDough"
            @input="$emit('checkCurrentInput', { dough: doughData.value })"
          />
          <img :src="getImage(doughData.image)" :alt="doughData.name" />
          <b>{{ doughData.name }}</b>
          <span>{{ doughData.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  doughTypes: {
    type: Array,
    default: () => [],
  },
  checkedDough: {
    type: String,
    required: true,
  },
});

defineEmits(["checkCurrentInput"]);

const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.dough__input {
  position: relative;
  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;
  cursor: pointer;

  img {
    @include p_center-v;
    width: 36px;
    height: 36px;
    transition: 0.3s;
    border-radius: 50%;
  }

  b {
    @include r-s16-h19;
  }

  span {
    @include l-s11-h13;
    display: block;
  }

  &:hover {
    img {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + img {
      box-shadow: $shadow-large;
    }
  }
}
</style>
