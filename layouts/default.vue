<script setup lang="ts">
</script>

<template>
  <div class="mx-auto flex h-full min-h-screen flex-col bg-green-light">
    <LayoutHeader />
    <div class="flex-auto">
      <slot />
    </div>
    <LayoutFooter/>
  </div>
</template>
