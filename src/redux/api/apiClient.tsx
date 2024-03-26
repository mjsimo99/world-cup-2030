//apiCLinet.tsx
import axios from 'axios';
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
        }
        catch (error) {
            return error;
        }
    },

    async updateClient(clientId: number, clientData: any) {
        try {
            await axios.put(`${API_URL}/${clientId}`, clientData
            );
        }
        catch (error) {
            return error;
        }
    }
}

export default ApiClient;