import axios from 'axios';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';

const API_URL = 'http://localhost:8080/api/matches';

const ApiMatch = {
    async getMatches() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async deleteMatch(matchId: number) {
        try {
            await axios.delete(`${API_URL}/${matchId}`);
            showSuccessAlert('Match deleted', `Match deleted successfully`);
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error deleting match', errorMessages);
        }
    },

    async createMatch(matchData: any) {
        try {
            const response = await axios.post(API_URL, matchData);
            showSuccessAlert('Match created', `Match ${response.data.name} created successfully`);
            return response.data; 
        } catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error creating match', errorMessages);
        }
    },

    async updateMatch(matchId: number, matchData: any) {
        try {
            await axios.put(`${API_URL}/${matchId}`, matchData);
            showSuccessAlert('Match updated', `Match ${matchData.name} updated successfully`);
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error updating match', errorMessages);
        }
    },
    async getMatchById(matchId: number) {
        try {
            const response = await axios.get(`${API_URL}/${matchId}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

};

export default ApiMatch;