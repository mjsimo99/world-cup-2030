import axios from 'axios';
import TeamMatch from '../../interfaces/team-match/TeamMatch';

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
            return response.data; 
        } catch (error) {
            return error;
        }
    },
    async deleteTeamMatch(teamId: number, matchId: number) {
        try {
            const response = await axios.delete(`${API_URL}/${teamId}/${matchId}`); // Ensure that teamId and matchId are used to form the API endpoint
            return response.data;
        } catch (error) {
            return error;
        }
    },
    
    async updateTeamMatch(teamId: number, matchId: number, teamMatchData: TeamMatch) {
        try {
            const response = await axios.put(`${API_URL}/${teamId}/${matchId}`, teamMatchData); // Include teamMatchData in the request body
            return response.data;
        } catch (error) {
            return error;
        }
    }
};

export default ApiTeamMatch;