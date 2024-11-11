<script setup lang="ts">
import { useSearchStore } from '~/stores/search'
const searchStore = useSearchStore()
let timeoutId: ReturnType<typeof setTimeout> // Для хранения ID таймера

const inputValue = ref('')

watch(inputValue, (value) => {
  // Очищаем предыдущий таймер, если он существует
  if (timeoutId)
    clearTimeout(timeoutId)


  // Устанавливаем новый таймер с задержкой 0.3 секунды
  timeoutId = setTimeout(() => {
    searchStore.setQuery(value)
  }, 300)
})

const options = {
  tokens: {
    A: {
      pattern: /[A-Za-zА-Яа-я]/,
      multiple: true,
    }
  },
}
</script>

<template>
  <div class="container mx-auto mt-8 border-b-2 pb-8 border-green-dark flex justify-center gap-5">
    <input class="w-11/12 sm:w-3/4 rounded-xl px-4 py-2 focus:outline-none"
           v-model="inputValue"
           v-maska:[options]
           placeholder="Поиск"
           data-maska="A">
    <Button class="hidden sm:block bg-green-dark text-white w-1/6">
      Поиск
    </Button>
  </div>
</template>

<style scoped>

</style>