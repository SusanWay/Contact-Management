<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  text: string
  type: 'tel' | 'email' | 'text'
  inputValue?: string
}

const props = defineProps<Props>()

// Переменная errorMessage принимает в себя error-значение(string) после валидации - используется в showError и отоброжении ошибок
// Переменная value связка через v-modal со значениями в input
const { errorMessage, value: inputValue } = useField(props.name)
if(props.inputValue) {
  inputValue.value = props.inputValue
}
// Переменная, которая используется при focus эффекте на input
const isFocused = ref(false)
// Используется, как индикатор отображение ошибок
const showError = ref(false)

// Массив стилей для анимации span
const translateStyleArr: Map<string, string> = new Map([['default', 'translate-y-5'], ['defaultActive', 'translate-y-2 text-sm']])

// Настройка патернов v-mask
// А: Включает в себя все симловы, кроме пробелов и отступов - используется для поля Почта
// В: Включает в себя только символы русского и английского алфавитов - используется для поля Имя
const options = {
  tokens: {
    A: {
      pattern: /\S/,
      multiple: true,
    },
    B: {
      pattern: /[A-Za-zА-Яа-я]/,
      multiple: true,
    },
  },
}
// Отвечает за анимацию во время focus эффекта на input, так же не позволяет опуститься тексту, когда input не пустой
const isActive = computed(() => {
  return isFocused.value || inputValue.value
})

// Отвечает за выбор паттерна ввода для разные типов input
const maskPattern = computed(() => {
  switch (props.type) {
    case 'tel':
      return '+7 (###) ###-##-##'
    case 'text':
      return 'B'
  }
  return 'A'
})

function getTranslateStyles() {
  return isActive.value ? 'translate-y-2 text-sm' : 'translate-y-5'
}
</script>

<template>
  <div class="group relative">
    <!-- Текст подсказка, которая выводится поверх input -->
    <span class="pointer-events-none absolute left-5 select-none text-black duration-300 text-base" :class="[getTranslateStyles()]">
      {{ text }}
    </span>
    <!-- validate-on-input используется, чтобы производить постоянную проверку валидации при первом ее провале -->
    <input
        v-model="inputValue"
        v-maska:[options]
        :data-maska="maskPattern"
        :type="type"
        class="w-full rounded-xl focus:outline-none bg-green-light p-5"
        :class="[{ 'border border-red': !!errorMessage && showError }]"
        :name="name"
        @focus="isFocused = true"
        @blur="[isFocused = false, showError = !!errorMessage && !!inputValue]"
    >
    <p v-if="!!errorMessage && showError" class="ml-5 mt-1 text-red text-base">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>

</style>
