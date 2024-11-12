// stores/contacts.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Contact } from '~/types'
import { generateContacts } from "~/utils"

export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as Array<Contact>,
        selectedContact: {} as Contact
    }),
    actions: {
        setSelectContact(selectedContact: Contact) {
            this.selectedContact = selectedContact
        },
        clearSelectedContact() {
            this.selectedContact = {} as Contact
        },
        async addContact(contact: Omit<Contact, 'id'>) {
            const newContact = {
                id: Date.now(), // Используем время в миллисекундах как уникальный ID
                ...contact,
            };
            try {
                const response = await axios.post('http://localhost:3001/contacts', newContact)

                this.contacts.push(response.data)
                this.saveToLocalStorage()
            }
            catch (error) {
                console.error("Ошибка при добавлении контакта на сервере:", error);
            }
        },
        async editContact(updatedContact: Contact) {
            const index = this.contacts.findIndex(contact => contact.id === updatedContact.id)
            if (index !== -1) {
                try {
                    await axios.put(`http://localhost:3001/contacts/${updatedContact.id}`, updatedContact)

                    this.contacts[index] = updatedContact
                    this.saveToLocalStorage()
                }
                catch (error) {
                    console.error("Ошибка при обновлении контакта на сервере:", error)
                }
            }
        },
        deleteContact(id: number) {
            this.contacts = this.contacts.filter(contact => contact.id !== id)
            this.saveToLocalStorage()
        },
        async loadFromLocalStorage() {
            const contactsData = localStorage.getItem('contacts')
            if (contactsData) {
                this.contacts = JSON.parse(contactsData);
            }
            else {
                try {
                    const response = await axios.get('http://localhost:3001/contacts')
                    this.contacts = response.data; // Сохраняем полученные контакты в состоянии
                }
                catch (error) {
                    console.error("Ошибка при получении контактов:", error)
                }
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('contacts', JSON.stringify(this.contacts))
        },
    },
});