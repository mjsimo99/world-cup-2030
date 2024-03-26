import { Dispatch } from 'redux';
import {  DELETE_CLIENT, GET_CLIENTS, UPDATE_CLIENT } from './actionTypes';
import ApiClient from '../api/apiClient';

export const getClients = () => {
  return async (dispatch: Dispatch) => {
    try {
      const clients = await ApiClient.getClients();
      dispatch({ type: GET_CLIENTS, payload: clients });
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
};

export const deleteClient = (clientId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await ApiClient.deleteClient(clientId);
      dispatch({ type: DELETE_CLIENT, payload: clientId });
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };
};

export const updateClient = (clientId: number, clientData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedClient = await ApiClient.updateClient(clientId, clientData);
      dispatch({ type: UPDATE_CLIENT, payload: updatedClient });
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };
};