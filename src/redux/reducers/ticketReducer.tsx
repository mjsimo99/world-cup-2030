import * as actionTypes from '../actions/actionTypes';
import Ticket from '../../interfaces/ticket/Ticket';


export interface TicketState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
}

const initialState: TicketState = {
    tickets: [],
    loading: false,
    error: null,
};

const ticketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_TICKETS:
            return {
                ...state,
                tickets: action.payload,
                loading: false,
                error: null,
            };
        case actionTypes.DELETE_TICKET:
            return {
                ...state,
                tickets: state.tickets.filter(ticket => ticket.ticketId !== action.payload),
            };
        case actionTypes.CREATE_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
                loading: false,
                error: null,
            };
        case actionTypes.UPDATE_TICKET:
            return {
                ...state,
                tickets: state.tickets.map(ticket => {
                    if (ticket.ticketId === action.payload.ticketId) {
                        return action.payload;
                    }
                    return ticket;
                }),
                loading: false,
                error: null,
            };

        default:
            return state;
    }
}

export default ticketReducer;
