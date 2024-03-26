import * as actionTypes from '../actions/actionTypes';
import Match from '../../interfaces/match/match';

export interface MatchState {
    matches: Match[];
    loading: boolean;
    error: string | null;
}

const initialState: MatchState = {
    matches: [],
    loading: false,
    error: null,
};

const matchReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_MATCHES:
            return {
                ...state,
                matches: action.payload,
                loading: false,
                error: null,
            };
        case actionTypes.DELETE_MATCH:
            return {
                ...state,
                matches: state.matches.filter(match => match.matchId !== action.payload),
            };
        case actionTypes.CREATE_MATCH:
            return {
                ...state,
                matches: [...state.matches, action.payload],
                loading: false,
                error: null,
            };
        case actionTypes.UPDATE_MATCH:
            return {
                ...state,
                matches: state.matches.map(match => {
                    if (match.matchId === action.payload.matchId) {
                        return action.payload;
                    }
                    return match;
                }),
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default matchReducer;