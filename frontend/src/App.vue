<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { useDataStore, useProfileStore, useCartStore } from "@/stores";

const dataStore = useDataStore();
const profileStore = useProfileStore();
const cartStore = useCartStore();

void profileStore.fetchAddresses();
void dataStore.fetchDoughs();
void dataStore.fetchIngredients();
void profileStore.fetchUserData();
void dataStore.fetchMisc();
void dataStore.fetchSauces();
void cartStore.fetchOrders();
void dataStore.fetchSizes();

console.log(dataStore.sizeItems);
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
