<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { useDataStore, useProfileStore } from "@/stores";

const dataStore = useDataStore();
const profileStore = useProfileStore();

void profileStore.fetchAddresses();
void dataStore.fetchDoughs();
void dataStore.fetchIngredients();
void profileStore.fetchUserData();
void dataStore.fetchMisc();

console.log(dataStore.miscItems);
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
