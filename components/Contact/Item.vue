<script setup lang="ts">
import type { Contact } from "~/types"

defineProps<Contact>()
const emit = defineEmits<{
  (e: 'deleteContact'): void,
  (e: 'editContact'): void
}>()
</script>

<template>
  <div class="w-full bg-green p-4 rounded-xl flex flex-col md:flex-row md:justify-between">
    <div class="w-full md:w-3/4">
      <p>
        <span class="text-gray">
          Имя:
        </span>
        {{ name }}
      </p>
      <p>
        <span class="text-gray">
          Почта:
        </span>
        {{ email }}
      </p>
      <p>
        <span class="text-gray">
          Телефон:
        </span>
        {{ phone }}
      </p>
    </div>
    <div class="mt-4 md:mt-0 w-full md:w-1/4 flex-row md:flex-col flex gap-2">
      <Button class="bg-yellow w-full" @click="emit('editContact')">
        Редактировать
      </Button>
      <Button class="bg-red w-full" @click="emit('deleteContact')">
        Удалить
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>