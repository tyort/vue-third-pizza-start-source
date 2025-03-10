<template>
  <div class="popup">
    <router-link :to="{ name: pathName }" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="{ name: pathName }" class="button">
        Отлично, я жду!
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from "@/stores";
import { ref } from "vue";

const profileStore = useProfileStore();
const pathName = ref(profileStore.userData?.id ? "orders" : "home");
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  :deep(a) {
    padding: 16px 32px;
  }
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>
