import * as types from '../actions/actionTypes';
import Client from '../../interfaces/client/Client';

export interface RegisterState {
  client: Client | null;
  loading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  client: null,
  loading: false,
  error: null,
};

const registerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        client: action.payload,
        loading: false,
        error: null,
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        client: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
