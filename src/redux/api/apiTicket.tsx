//apiTicket.tsx
import axios from 'axios';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';
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
            showSuccessAlert('Ticket deleted', `Ticket deleted successfully`);
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error deleting ticket', errorMessages);
        }
    },

    async createTicket(ticketData: any) {
        try {
            const response = await axios.post(API_URL, ticketData);
            showSuccessAlert('Ticket bought!', 'The ticket has been bought.');
            return response.data;
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error buying ticket', errorMessages);
        }
    },

    async updateTicket(ticketId: number, ticketData: any) {
        try {
            await axios.put(`${API_URL}/${ticketId}`, ticketData);
            showSuccessAlert('Ticket updated', `Ticket updated successfully`);
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error updating ticket', errorMessages);
        }
    },
    async fetchTicketsByClientId(clientId: number) {
        try {
            const response = await axios.get(`${API_URL}/clients/${clientId}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
    
};


export default ApiTicket;