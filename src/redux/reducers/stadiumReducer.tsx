import * as actionTypes from '../actions/actionTypes';
import Stadium from '../../interfaces/stadium/Stadiums';

export interface StadiumState {
  stadiums: Stadium[];
  loading: boolean;
  error: string | null;
}

const initialState: StadiumState = {
  stadiums: [],
  loading: false,
  error: null,
};

const stadiumReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_STADIUMS:
      return {
        ...state,
        stadiums: action.payload, 
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_STADIUM:
      return {
        ...state,
        stadiums: state.stadiums.filter(stadium => stadium.stadiumId !== action.payload),
      };
      case actionTypes.CREATE_STADIUM:
    return {
        ...state,
        stadiums: [...state.stadiums, action.payload],
        loading: false,
        error: null,
    };
    case actionTypes.UPDATE_STADIUM:
      return {
        ...state,
        stadiums: state.stadiums.map(stadium => {
          if (stadium.stadiumId === action.payload.stadiumId) {
            return action.payload;
          }
          return stadium;
        }),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default stadiumReducer;
