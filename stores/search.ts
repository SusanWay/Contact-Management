// stores/searchStore.ts
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: () => ({
        query: '' as string,
    }),
    actions: {
        // Действие для обновления поискового запроса
        setQuery(newQuery: string) {
            this.query = newQuery;
        },
    },
});