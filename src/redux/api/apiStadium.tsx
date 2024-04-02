import axios from 'axios';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';
import Stadium from '../../interfaces/stadium/Stadiums';

const API_URL = 'http://localhost:8080/api/stadiums';

const ApiStadium = {
    async getStadiums() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async deleteStadium(stadiumId: number) {
        try {
            await axios.delete(`${API_URL}/${stadiumId}`);
            showSuccessAlert('Stadium deleted', `Stadium deleted successfully`);
        }catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error deleting stadium', errorMessages);
        }
    },

    async createStadium(stadiumData: Stadium ) {
        try {
            const response = await axios.post(API_URL, stadiumData);
            showSuccessAlert('Stadium created', `Stadium ${response.data.name} created successfully`);
            return response.data; 
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error creating stadium', errorMessages);
        }
    },

    async updateStadium(stadiumId: number, stadiumData: Stadium) {
        try {
            await axios.put(`${API_URL}/${stadiumId}`, stadiumData);
            showSuccessAlert('Stadium updated', `Stadium ${stadiumData.name} updated successfully`);
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error updating stadium', errorMessages);
        }
    }
};

export default ApiStadium;

