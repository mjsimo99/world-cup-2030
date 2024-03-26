// apiLogin.tsx

import axios from 'axios';
const API_URL = 'http://localhost:8080/admin/login';

const ApiLogin = {
    async login(username: string, password: string) {
        try {
            const response = await axios.post(API_URL, {
                username,
                password
            });
            return response.data;
        } catch (error) {
            return error;
        }
    }
};