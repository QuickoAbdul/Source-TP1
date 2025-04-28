import axios from 'axios';

export default class BeerAPI {

    constructor() {
        this.apiUrl = 'http://localhost:3000/';
    }

    async getAllBeers() {
        try {
            const response = await axios.get(`${this.apiUrl}beers`);
            return response.data;
        } catch (error) {
            console.error('Error fetching beers:', error);
            throw error;
        }
    }

    async addBeer(beer) {
        try {
            const response = await axios.post(`${this.apiUrl}beer`, beer);
            console.log('Added beer:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding beer:', error);
            throw error;
        }
    }

    async updateBeer(beer) {
        try {
            const response = await axios.put(`${this.apiUrl}beers/${beer.id}`, beer);
            return response.data;
        } catch (error) {
            console.error('Error updating beer:', error);
            throw error;
        }
    }

    async deleteBeer(beerId) {
        try {
            await axios.delete(`${this.apiUrl}beer?id=${beerId}`);
        } catch (error) {
            console.log(`${this.apiUrl}beer?id=${beerId}`);
            console.error('Error deleting beer:', error);
            throw error;
        }
    }
}