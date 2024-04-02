//apiCLinet.tsx
import axios from 'axios';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';
import Client from '../../interfaces/client/Client';
const API_URL = 'http://localhost:8080/api/clients';

const ApiClient = {
    async getClients() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async deleteClient(clientId: number) {
        try {
            await axios.delete(`${API_URL}/${clientId}`);
            showSuccessAlert('Client deleted', `Client deleted successfully`);
        } catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error deleting client', errorMessages);
        }
    },

    async updateClient(clientId: number, clientData: Client) {
        try {
            await axios.put(`${API_URL}/${clientId}`, clientData);
            showSuccessAlert('Client updated', `Client ${clientData.firstName} ${clientData.lastName} updated successfully`);
        } catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error updating client', errorMessages);
        }
    }
}

export default ApiClient;