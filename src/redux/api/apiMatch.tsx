import axios from 'axios';

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
        } catch (error) {
            return error;
        }
    },

    async createMatch(matchData: any) {
        try {
            const response = await axios.post(API_URL, matchData);
            return response.data; 
        } catch (error) {
            return error;
        }
    },

    async updateMatch(matchId: number, matchData: any) {
        try {
            await axios.put(`${API_URL}/${matchId}`, matchData);
        } catch (error) {
            return error;
        }
    }

};

export default ApiMatch;