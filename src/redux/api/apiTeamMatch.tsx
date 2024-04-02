import axios from 'axios';
import TeamMatch from '../../interfaces/team-match/TeamMatch';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';

const API_URL = 'http://localhost:8080/api/team-matches';

const ApiTeamMatch = {
    async getTeamMatches() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },



    async createTeamMatch(teamMatchData: TeamMatch) {
        try {
            const response = await axios.post(API_URL, teamMatchData);
            showSuccessAlert('Team Match created', `Team Match created successfully`);
            return response.data;
        } catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error creating team match', errorMessages);
        }
    },
    async deleteTeamMatch(teamId: number, matchId: number) {
        try {
            const response = await axios.delete(`${API_URL}/${teamId}/${matchId}`);
            showSuccessAlert('Team Match deleted', `Team Match deleted successfully`);
            return response.data;
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error deleting team match', errorMessages);
        }
    },

    async updateTeamMatch(teamId: number, matchId: number, teamMatchData: TeamMatch) {
        try {
            const response = await axios.put(`${API_URL}/${teamId}/${matchId}`, teamMatchData);
            showSuccessAlert('Team Match updated', `Team Match updated successfully`);
            return response.data;
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error updating team match', errorMessages);
        }
    }
};

export default ApiTeamMatch;