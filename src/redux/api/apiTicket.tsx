//apiTicket.tsx
import axios from 'axios';
const API_URL = 'http://localhost:8080/api/tickets';

const ApiTicket = {
    async getTickets() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async deleteTicket(ticketId: number) {
        try {
            await axios.delete(`${API_URL}/${ticketId}`);
        }
        catch (error) {
            return error;
        }
    },

    async createTicket(ticketData: any) {
        try {
            const response = await axios.post(API_URL, ticketData);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async updateTicket(ticketId: number, ticketData: any) {
        try {
            await axios.put(`${API_URL}/${ticketId}`, ticketData
            );
        }
        catch (error) {
            return error;
        }
    }
};

export default ApiTicket;