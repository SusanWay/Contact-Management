<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useContactStore } from '~/stores/contacts'

const vfm = useVfm()
const contactStore = useContactStore()

interface ContactForm {
  id: number
  name: string
  phone: string
  email: string
}

const contactFormValidationSchema = yup.object().shape({
  id: yup.number(),
  email: yup.string().required().email('Почта должна быть в формате: example@domain.com'),
  phone: yup.string().required().length(18, 'Телефон должен содержать 11 цифр!'),
  name: yup.string().required().min(2, 'Имя должно содержать минимум 2 буквы'),
})


const { values, meta, setValues } = useForm<ContactForm>({
  validationSchema: contactFormValidationSchema,
})

const isEnabled = computed(() => {
  return meta.value.valid
})

function closeForm() {
  contactStore.selectContact({})

  vfm.close('editContact')
}
function sendForm() {
  const contact = {...values}

  console.log(contact)
  contactStore.editContact(contact)

  closeForm()
}

function getData() {
  setValues({...contactStore.selectedContact})
}
</script>

<template>
  <VueFinalModal
      modal-id="editContact"
      content-class="fixed inset-0 sm:rounded-3xl bg-green p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2"
      @before-open="getData()"
  >
    <form @submit.prevent="sendForm">
      <h1 class="text-center text-title-sm font-bold">
        Редактировать контакт
      </h1>
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
      <div class="flex gap-2.5 mt-5">
        <Button type="submit" :disabled="!isEnabled" class="text-black w-full bg-green-dark disabled:bg-gray disabled:text-white">
          Изменить даные
        </Button>
        <Button @click="closeForm" class="text-white w-full bg-red">
          Закрыть форму
        </Button>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped>

</style>