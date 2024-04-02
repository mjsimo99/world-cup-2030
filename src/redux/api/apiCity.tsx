//apiCity.tsx
import axios from 'axios';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';
import City from '../../interfaces/city/City';
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
            showSuccessAlert('City deleted', `City deleted successfully`);
        }
        catch (error) {
            return error;
        }
    },

    async createCity(cityData: City) {
        try {
            const response = await axios.post(API_URL, cityData);
            showSuccessAlert('City created', `City ${response.data.name} created successfully`);
            return response.data;
        } catch (error : any) {
            showErrorAlert('Error creating city',error.response.data.name);
        }
    },

    async updateCity(cityId: number, cityData: City) {
        try {
            await axios.put(`${API_URL}/${cityId}`, cityData);
            showSuccessAlert('City updated', `City ${cityData.name} updated successfully`);
        }
        catch (error : any) {
            showErrorAlert('Error updating city', error.response.data.name);
        }
    }
};

export default ApiCity;