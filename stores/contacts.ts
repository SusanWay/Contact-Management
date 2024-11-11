// stores/contacts.ts
import { defineStore } from 'pinia'
import type { Contact } from '~/types'
import { generateContacts } from "~/utils"

export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as Array<Contact>,
        selectedContact: {} as Contact
    }),
    actions: {
        addContact(contact: Omit<Contact, 'id'>) {
            const newContact = {
                id: Date.now(), // Используем время в миллисекундах как уникальный ID
                ...contact,
            };
            this.contacts.push(newContact)
            this.saveToLocalStorage()
        },
        selectContact(selectedContact: Contact) {
            this.selectedContact = selectedContact
        },
        editContact(updatedContact: Contact) {
            const index = this.contacts.findIndex(contact => contact.id === updatedContact.id)
            if (index !== -1) {
                this.contacts[index] = updatedContact
                this.saveToLocalStorage()
            }
        },
        deleteContact(id: number) {
            this.contacts = this.contacts.filter(contact => contact.id !== id)
            this.saveToLocalStorage()
        },
        loadFromLocalStorage() {
            const contactsData = localStorage.getItem('contacts')
            if (contactsData) {
                this.contacts = JSON.parse(contactsData);
            }
            else {
                this.contacts = generateContacts()
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('contacts', JSON.stringify(this.contacts))
        },
    },
});