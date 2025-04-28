import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        listbeers: [],
        beers: {
            id: null,
            name: null,
            priceTTC: null,
            priceHT: null,
            alcoholDegre: null,
            comment: null,
            type: null,
            owner: null,
        }
    }),
})