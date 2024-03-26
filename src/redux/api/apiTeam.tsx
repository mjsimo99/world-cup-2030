import axios from 'axios';
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
        }
        catch (error) {
            return error;
        }
    },

    async createTeam(teamData: any) {
        try {
            const response = await axios.post(API_URL, teamData);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async updateTeam(teamId: number, teamData: any) {
        try {
            await axios.put(`${API_URL}/${teamId}`, teamData);
        }
        catch (error) {
            return error;
        }
    }
};

export default ApiTeam;
    