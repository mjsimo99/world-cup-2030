import axios from 'axios';
import ServiceResponse from '../interfaces/serviceResponse/ServiceResponse';
import Stadium from '../interfaces/stadium/Stadiums';



class StadiumService {
    static async getStadiums(): Promise<ServiceResponse<Stadium[]>> {
        try {
            const response = await axios.get<Stadium[]>('http://localhost:8080/api/stadiums');
            return { data: response.data };
        } catch (error) {
            return { data: [], error: 'Failed to fetch stadiums' };
        }
    }
    static async createStadium(stadiumData: Partial<Stadium>): Promise<ServiceResponse<Stadium>> {
        try {
            const response = await axios.post<Stadium>('http://localhost:8080/api/stadiums', stadiumData);
            return { data: response.data };
        } catch (error) {
            return { data: null, error: 'Failed to create stadium' };
        }
    }
    static async deleteStadium(stadiumId: number): Promise<ServiceResponse<void>> {
        try {
            await axios.delete(`http://localhost:8080/api/stadiums/${stadiumId}`);
            return { data: null };
        } catch (error) {
            return { data: null, error: 'Failed to delete stadium' };
        }
    }
    static async updateStadium(stadiumId: number, stadiumData: Partial<Stadium>): Promise<ServiceResponse<Stadium>> {
        try {
            const response = await axios.put<Stadium>(`http://localhost:8080/api/stadiums/${stadiumId}`, stadiumData);
            return { data: response.data };
        } catch (error) {
            return { data: null, error: 'Failed to update stadium' };
        }
    }
    static async getStadiumById(stadiumId: number): Promise<ServiceResponse<Stadium>> {
        try {
            const response = await axios.get<Stadium>(`http://localhost:8080/api/stadiums/${stadiumId}`);
            return { data: response.data };
        } catch (error) {
            return { data: null, error: 'Failed to fetch stadium by ID' };
        }
    }
}



export default StadiumService;
