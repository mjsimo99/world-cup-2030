import axios from 'axios';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';
const API_URL = 'http://localhost:8080/api/teams';

const ApiTeam = {
    async getTeams() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async deleteTeam(teamId: number) {
        try {
            await axios.delete(`${API_URL}/${teamId}`);
            showSuccessAlert('Team deleted', `Team deleted successfully`);
        } catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error deleting team', errorMessages);
        }
    },

    async createTeam(teamData: any) {
        try {
            const response = await axios.post(API_URL, teamData);
            showSuccessAlert('Team created', `Team ${response.data.country} created successfully`);
            return response.data;
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error creating team', errorMessages);
        }
    },

    async updateTeam(teamId: number, teamData: any) {
        try {
            await axios.put(`${API_URL}/${teamId}`, teamData);
            showSuccessAlert('Team updated', `Team ${teamData.country} updated successfully`);
        } catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error updating team', errorMessages);
        }
    }
};

export default ApiTeam;
    