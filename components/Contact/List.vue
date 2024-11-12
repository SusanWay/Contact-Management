<script setup lang="ts">
import {  useVfm } from 'vue-final-modal'
import { useContactStore } from '~/stores/contacts'
import { useSearchStore } from '~/stores/search'
import type { Contact } from "~/types"


const fvm = useVfm()
const contactStore = useContactStore()
const searchStore = useSearchStore()


const sortedContacts = computed(()=>{
  return contactStore.contacts.filter(
      contact => contact.name.toLowerCase().includes(searchStore.query.toLowerCase())
  )
})

function editContact(contact: Contact) {
  contactStore.setSelectContact(contact)

  fvm.open('editContact')
}

onMounted(() => {
  contactStore.loadFromLocalStorage()
})
</script>

<template>
  <div class="container mx-auto">
    <h1 v-if="searchStore.query" class="text-title ">
      Результаты по запросу "<span class="text-green-dark"> {{ searchStore.query }} </span>":
    </h1>
    <section class="mt-5 grid px-4 xl:px-0 grid-cols-1 xl:grid-cols-2 gap-5">
      <ContactItem
          v-if="sortedContacts.length"
          v-for="item in sortedContacts"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :email="item.email"
          :phone="item.phone"
          @delete-contact="contactStore.deleteContact(item.id)"
          @edit-contact="editContact(item)"
      />
      <h2 v-else class="text-title-sm">
        Ничего не найдено :(
      </h2>
    </section>
  </div>

</template>

<style scoped>

</style>