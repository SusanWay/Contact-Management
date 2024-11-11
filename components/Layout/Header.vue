<script setup lang="ts">
import { useVfm } from 'vue-final-modal'

const vfm = useVfm()

function openForm() {
  vfm.open('addContact')
}
</script>

<template>
  <div class="bg-green-dark px-4 xl:px-0 h-20 sticky top-0 z-10">
    <div class="container h-full flex mx-auto items-center justify-between gap-2.5">
      <p class="text-lg  sm:text-title-sm text-white">
        Менеджер контаков
      </p>
      <Button @click="openForm" class="text-white">
        Добавить контакт
      </Button>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
