import { Dispatch } from 'redux';
import { CREATE_TICKET, DELETE_TICKET, GET_TICKETS, UPDATE_TICKET , GET_TICKETS_ERROR} from './actionTypes';
import ApiTicket from '../api/apiTicket';
import Ticket from '../../interfaces/ticket/Ticket';

export const getTickets = () => {
    return async (dispatch: Dispatch) => {
        try {
        const tickets = await ApiTicket.getTickets();
        dispatch({ type: GET_TICKETS, payload: tickets });
        } catch (error) {
        console.error("Error fetching tickets:", error);
        dispatch({ type: GET_TICKETS_ERROR, payload: error });
        }
    };
    }

export const deleteTicket = (ticketId: number) => {
    return async (dispatch: Dispatch) => {
        try {
        await ApiTicket.deleteTicket(ticketId);
        dispatch({ type: DELETE_TICKET, payload: ticketId });
        } catch (error) {
        console.error("Error deleting ticket:", error);
        }
    };
    };

export const createTicket = (ticketData: Partial<Ticket>) => {
    return async (dispatch: Dispatch) => {
        try {
        const createdTicket = await ApiTicket.createTicket(ticketData);
        dispatch({ type: CREATE_TICKET, payload: createdTicket });
        return createdTicket;
        } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
        }
    };
    }

export const updateTicket = (ticketId: number, ticketData: Partial<Ticket>) => {
    return async (dispatch: Dispatch) => {
        try {
        const updatedTicket = await ApiTicket.updateTicket(ticketId, ticketData);
        dispatch({ type: UPDATE_TICKET, payload: updatedTicket });
        } catch (error) {
        console.error("Error updating ticket:", error);
        }
    };
    };