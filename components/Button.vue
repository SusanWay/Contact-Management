<script setup lang="ts">
interface Props {
  disabled?: boolean
  to?: string
}

const props = defineProps<Props>()

const component = computed(() => {
  if (props.to)
    return resolveComponent('NuxtLink')
  return 'button'
})
</script>

<template>
  <component :is="component" :disabled="props.disabled" class="p-2 border-white border rounded-[8px] cursor-pointer">
    <div>
      <p class="text-base text-center select-none">
        <slot/>
      </p>
    </div>
  </component>
</template>

<style scoped>

</style>