import * as actionTypes from "../actions/actionTypes";
import City from "../../interfaces/city/City"; 


export interface CityState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
};

const cityReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(city => city.cityId !== action.payload),
      };
    case actionTypes.CREATE_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_CITY:
      return {
        ...state,
        cities: state.cities.map(city => {
          if (city.cityId === action.payload.cityId) {
            return action.payload;
          }
          return city;
        }),
        loading: false,
        error: null,
      };
    
    default:
      return state;
  }
}

export default cityReducer;
