import axios from 'axios';
import { showErrorAlert, showSuccessAlert } from '../../interceptor/sweetAlertUtils';
import Client from '../../interfaces/client/Client';
const API_URL = 'http://localhost:8080/client/register';

const ApiRegister = {
    async register(registerData: Client) {
        try {
            const response = await axios.post(API_URL, registerData);
            showSuccessAlert('Client registered', 'Registration successful , please login to continue.');
            return response.data;
        }  catch (error : any) {
            const errorData = error.response.data;
            const errorMessages = Object.values(errorData).join(' + ');
            showErrorAlert('Error registering client', errorMessages);
        }
    }
};

export default ApiRegister;