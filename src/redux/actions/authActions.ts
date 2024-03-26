
import axios from 'axios';
import { Dispatch } from 'redux';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT , REGISTER_SUCCESS, REGISTER_FAILURE } from './actionTypes';
import ApiRegister from '../api/apiRegister';


interface LoginResponse {
  token: string;
}

interface LoginPayload {
  username: string;
  password: string;
  isAdmin: boolean;
}

export const login = (username: string, password: string, isAdmin: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      const loginPayload: LoginPayload = { username, password, isAdmin };
      const endpoint = isAdmin ? 'http://localhost:8080/admin/login' : 'http://localhost:8080/client/login';
      const response = await axios.post<LoginResponse>(endpoint, loginPayload);
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid username or password' });
    }
  };
};
export const register = (registerData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ApiRegister.register(registerData);
      dispatch({ type: REGISTER_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: 'Invalid username or password' });
    }
  };
};



export const logout = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT };
};
