import axios from 'axios';
import ServiceResponse from '../interfaces/serviceResponse/ServiceResponse';
import City from '../interfaces/city/City';



class CityService {
    static async getCities(): Promise<ServiceResponse<City[]>> {
        try {
            const response = await axios.get<City[]>('http://localhost:8080/api/cities');
            return { data: response.data };
        } catch (error) {
            return { data: [], error: 'Failed to fetch cities' };
        }
    }
}

export default CityService;
