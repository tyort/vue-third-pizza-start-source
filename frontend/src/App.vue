<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { useDataStore } from "@/stores";

const dataStore = useDataStore();

void dataStore.fetchAddresses();
void dataStore.fetchDoughs();

console.log(dataStore.doughItems);
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
