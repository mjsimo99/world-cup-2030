import { Dispatch } from 'redux';
import { CREATE_CITY, DELETE_CITY, GET_CITIES, UPDATE_CITY } from './actionTypes';
import ApiCity from '../api/apiCity';
import City from '../../interfaces/city/City';


export const getCities = () => {
  return async (dispatch: Dispatch) => {
    try {
      const cities = await ApiCity.getCities();
      dispatch({ type: GET_CITIES, payload: cities });
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
};

export const deleteCity = (cityId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      
      await ApiCity.deleteCity(cityId);
      dispatch({ type: DELETE_CITY, payload: cityId });
    } catch (error) {
    }
  };
};

export const createCity = (cityData: City) => {
  return async (dispatch: Dispatch) => {
    try {
      const createdCity = await ApiCity.createCity(cityData);
      dispatch({ type: CREATE_CITY, payload: createdCity });
      return createdCity;
    } catch (error) {
      throw error;
    }
  };
};

export const updateCity = (cityId: number, cityData: City) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedCity = await ApiCity.updateCity(cityId, cityData);
      dispatch({ type: UPDATE_CITY, payload: updatedCity });
    } catch (error) {
      console.error("Error updating city:", error);
      throw error;
    }
  };
};
