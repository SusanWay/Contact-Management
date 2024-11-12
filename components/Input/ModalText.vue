<script setup lang="ts">
import { useField } from 'vee-validate'
import { options, getMaskaPatern } from "~/utils/maska"

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

// Отвечает за анимацию во время focus эффекта на input, так же не позволяет опуститься тексту, когда input не пустой
const isActive = computed(() => {
  return isFocused.value || inputValue.value
})

function getTranslateStyles() {
  return isActive.value ? 'translate-y-2 text-sm' : 'translate-y-5'
}

function formatPhone(input: Ref<string>) {
  if (input.replace(/\D/g, '').startsWith('8'))
    inputValue.value = '7' + input.replace(/\D/g, '').slice(1)
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
        :data-maska="getMaskaPatern(type)"
        :type="type"
        class="w-full rounded-xl focus:outline-none bg-green-light p-5"
        :class="[{ 'border border-red': !!errorMessage && showError }]"
        :name="name"
        @focus="isFocused = true"
        @blur="[isFocused = false, showError = !!errorMessage && !!inputValue]"
        @input="formatPhone(inputValue)"
    >
    <p v-if="!!errorMessage && showError" class="ml-5 mt-1 text-red text-base">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>

</style>
