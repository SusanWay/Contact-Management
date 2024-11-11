<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#cce9e4" :height="2" />
    <NuxtPage />
    <Modals />
    <ModalsContainer/>
  </NuxtLayout>
</template>

<style>
p {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>