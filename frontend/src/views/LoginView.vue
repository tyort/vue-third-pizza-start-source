<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post" @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="userData.email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="userData.password"
            type="password"
            name="pass"
            placeholder="**********"
            required
          />
        </label>
      </div>
      <button type="submit" class="button" :disabled="!isFormValid.status">
        Авторизоваться
      </button>
      <div v-if="!isFormValid.status" class="server-error">
        {{ isFormValid.message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, shallowRef, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getValidationError } from "../common/validator";
import { useProfileStore } from "@/stores";

const router = useRouter();
const route = useRoute();
const profileStore = useProfileStore();

const isFormValid = shallowRef({ status: true, message: "" });
const userData = reactive({
  email: "",
  password: "",
});

watch(userData, () => {
  isFormValid.value = { status: true, message: "" };
});

const onSubmit = async () => {
  const isErrorsAppear = getValidationError(userData);
  isFormValid.value = { status: !isErrorsAppear, message: isErrorsAppear };

  if (!isFormValid.value.status) {
    return;
  }

  const res = await profileStore.login(userData);
  if (res.__state == "success") {
    await profileStore.whoami();
    router.push(route.query.redirect || { name: "home" });
  } else {
    isFormValid.value = { status: false, message: res.data.message };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
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

.server-error {
  height: 16px;
  color: $red-800;
  margin-top: 20px;
}
</style>
