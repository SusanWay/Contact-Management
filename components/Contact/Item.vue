<script setup lang="ts">
import type { Contact } from "~/types"
import { unformatPhoneNumber } from "~/utils"
defineProps<Contact>()
const emit = defineEmits<{
  (e: 'deleteContact'): void,
  (e: 'editContact'): void
}>()
</script>

<template>
  <div class="w-full bg-green p-4 rounded-xl flex flex-row md:justify-between">
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
        {{ unformatPhoneNumber(phone) }}
      </p>
    </div>
    <div class="mt-4 md:mt-0 flex-row items-center md:flex-col flex gap-2">
      <Button class="bg-yellow" @click="emit('editContact')">
        <Icon name="edit" />
      </Button>
      <Button class="bg-red " @click="emit('deleteContact')">
        <Icon name="delete" class="text-white" />
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>