import * as actionTypes from "../actions/actionTypes";
import Client from "../../interfaces/client/Client";

export interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

const clientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client.clientId !== action.payload),
      };
    case actionTypes.UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map(client => {
          if (client.clientId === action.payload.clientId) {
            return action.payload;
          }
          return client;
        }),
        loading: false,
        error: null,
      };
    
    default:
      return state;
  }
}

export default clientReducer;