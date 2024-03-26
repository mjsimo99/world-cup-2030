import axios from 'axios';

const API_URL = 'http://localhost:8080/client/register';

const ApiRegister = {
    async register(registerData: any) {
        try {
            const response = await axios.post(API_URL, registerData);
            return response.data;
        } catch (error) {
            return error;
        }
    }
};

export default ApiRegister;