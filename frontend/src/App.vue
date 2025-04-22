<template>
  <app-layout>
    <!-- Библиотека vue-router передаёт в v-slot компонент, который должен быть отображен в соответствии с текущим маршрутом. -->
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </app-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { useDataStore, useProfileStore } from "@/stores";
import JwtService from "@/services/jwt/jwt.service";
import { router } from "@/router";
import { useRoute } from "vue-router";

const dataStore = useDataStore();
const route = useRoute();
const isLoaded = ref(false);

const checkLoggedIn = async () => {
  const profileStore = useProfileStore();
  const token = JwtService.getToken();
  if (!token) {
    isLoaded.value = true;
    return;
  }

  try {
    await profileStore.whoami();
    const { redirect } = route.query;
    await router.push(redirect ? redirect : { name: "home" });
  } catch (e) {
    JwtService.destroyToken();
    console.error(e);
  } finally {
    isLoaded.value = true;
  }
};

onMounted(() => {
  checkLoggedIn();
  dataStore.loadData();
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
