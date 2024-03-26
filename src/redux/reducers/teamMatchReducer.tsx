import * as actionTypes from '../actions/actionTypes';
import TeamMatch from '../../interfaces/team-match/TeamMatch';

export interface TeamMatchState {
  teamMatches: TeamMatch[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamMatchState = {
  teamMatches: [],
  loading: false,
  error: null,
};

const teamMatchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_TEAM_Matches:
      return {
        ...state,
        teamMatches: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_MATCHES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CREATE_TEAM_MATCH:
      return {
        ...state,
        teamMatches: [...state.teamMatches, action.payload],
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_TEAM_MATCH:
      return {
        ...state,
        teamMatches: state.teamMatches.filter((teamMatch) => teamMatch.teamId !== action.payload.teamId && teamMatch.matchId !== action.payload.matchId),
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_TEAM_MATCH:
      return {
        ...state,
        teamMatches: state.teamMatches.map((teamMatch) => {
          if (teamMatch.teamId === action.payload.teamId && teamMatch.matchId === action.payload.matchId) {
            return action.payload;
          }
          return teamMatch;
        }),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default teamMatchReducer;