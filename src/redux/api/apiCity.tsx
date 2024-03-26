//apiCity.tsx
import axios from 'axios';
const API_URL = 'http://localhost:8080/api/cities';

const ApiCity = {
    async getCities() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async deleteCity(cityId: number) {
        try {
            await axios.delete(`${API_URL}/${cityId}`);
        }
        catch (error) {
            return error;
        }
    },

    async createCity(cityData: any) {
        try {
            const response = await axios.post(API_URL, cityData);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async updateCity(cityId: number, cityData: any) {
        try {
            await axios.put(`${API_URL}/${cityId}`, cityData
            );
        }
        catch (error) {
            return error;
        }
    }
};

export default ApiCity;