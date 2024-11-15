<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useContactStore } from '~/stores/contacts'
import { formatFormValues } from "~/utils"

const vfm = useVfm()
const contactStore = useContactStore()

interface ContactForm {
  name: string
  phone: string
  email: string
}

const contactFormValidationSchema = yup.object().shape({
  email: yup.string().required().email('Почта должна быть в формате: example@domain.com'),
  phone: yup.string().required().length(18, 'Телефон должен содержать 11 цифр!'),
  name: yup.string().required().min(2, 'Имя должно содержать минимум 2 буквы'),
})

const { values, meta } = useForm<ContactForm>({ validationSchema: contactFormValidationSchema })

const isEnabled = computed(() => {
  return meta.value.valid
})

function closeForm() {
  vfm.close('addContact')
}
function sendForm() {
  const contact = formatFormValues(values)

  contactStore.addContact(contact)
  closeForm()
}

</script>

<template>
  <VueFinalModal
      modal-id="addContact"
      content-class="fixed inset-0 sm:rounded-3xl bg-green p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2"
  >
    <form @submit.prevent="sendForm">
      <div class="flex w-full content-center items-center justify-between md:inline-block">
        <h1 class="text-center text-title-sm font-bold">
          Добавить новый контакт
        </h1>
        <Button type="button" class="border-0 block md:absolute md:right-6 md:top-6" @click="closeForm()">
          <div class="relative flex h-6 w-6">
            <span class="absolute top-[7px] h-0.5 w-full translate-y-1 rotate-45 bg-black" />
            <span class="absolute bottom-[7px] h-0.5 w-full -translate-y-1 -rotate-45 bg-black" />
          </div>
        </Button>
      </div>
      <div class="flex-col flex gap-2.5 mt-5">
        <InputModalText
            name="name"
            type="text"
            text="Имя *"
        />
        <InputModalText
            name="email"
            type="email"
            text="Почта *"
        />
        <InputModalText
            name="phone"
            type="tel"
            text="Телефон *"
        />
      </div>
      <div class="flex mt-5">
        <Button type="submit" :disabled="!isEnabled" class="text-black w-full bg-green-dark disabled:bg-gray disabled:text-white">
          Отправить даные
        </Button>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped>

</style>