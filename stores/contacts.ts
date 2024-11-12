// stores/contacts.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Contact } from '~/types'
import { useRuntimeConfig } from "#app"

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
                id: Date.now().toString(), // Используем время в миллисекундах как уникальный ID
                ...contact,
            };
            try {
                const runtimeConfig = useRuntimeConfig()

                const response = await axios.post(`${runtimeConfig.public.apiBase}contacts`, newContact)

                this.contacts.push(response.data)
            }
            catch (error) {
                console.error("Ошибка при добавлении контакта на сервере:", error)
                await this.updateData()
            }
            finally {
                this.saveToLocalStorage()
            }
        },
        async editContact(updatedContact: Contact) {
            const index = this.contacts.findIndex(contact => contact.id === updatedContact.id)
            if (index !== -1) {
                try {
                    const runtimeConfig = useRuntimeConfig()

                    await axios.put(`${runtimeConfig.public.apiBase}contacts/${updatedContact.id}`, updatedContact)

                    this.contacts[index] = updatedContact
                }
                catch (error) {
                    console.error("Ошибка при обновлении контакта на сервере:", error)
                    await this.updateData()
                } finally {
                    this.saveToLocalStorage()
                }
            }
        },
        async deleteContact(id: number) {
            try {
                const runtimeConfig = useRuntimeConfig()

                await axios.delete(`${runtimeConfig.public.apiBase}contacts/${id}`)

                this.contacts = this.contacts.filter(contact => contact.id !== id)

            } catch (error) {
                console.error("Ошибка при удалении контакта на сервере:", error)
                await this.updateData()
            } finally {
                this.saveToLocalStorage()
            }
        },
        async loadFromLocalStorage() {
            const contactsData = localStorage.getItem('contacts')
            if (contactsData) {
                this.contacts = JSON.parse(contactsData);
            }
            else {
                try {
                    await this.updateData()
                }
                catch (error) {
                    console.error("Ошибка при получении контактов:", error)
                }
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('contacts', JSON.stringify(this.contacts))
        },
        async updateData() {
            const runtimeConfig = useRuntimeConfig()

            const response = await axios.get(`${runtimeConfig.public.apiBase}contacts`)
            this.contacts = response.data
        }
    },
});