import axios from 'axios';

const API_URL = 'http://localhost:8080/api/stadiums';

const ApiStadium = {
    async getStadiums() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async deleteStadium(stadiumId: number) {
        try {
            await axios.delete(`${API_URL}/${stadiumId}`);
        } catch (error) {
            return error;
        }
    },

    async createStadium(stadiumData: any) {
        try {
            const response = await axios.post(API_URL, stadiumData);
            return response.data; 
        } catch (error) {
            return error;
        }
    },

    async updateStadium(stadiumId: number, stadiumData: any) {
        try {
            await axios.put(`${API_URL}/${stadiumId}`, stadiumData);
        } catch (error) {
            return error;
        }
    }
};

export default ApiStadium;

