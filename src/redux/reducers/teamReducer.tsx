import * as actionTypes from "../actions/actionTypes";
import Team from "../../interfaces/team/Team";


export interface TeamState {
    teams: Team[];
    loading: boolean;
    error: string | null;
}

const initialState: TeamState = {
    teams: [],
    loading: false,
    error: null,
};

const teamReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                loading: false,
                error: null,
            };
        case actionTypes.DELETE_TEAM:
            return {
                ...state,
                teams: state.teams.filter(team => team.teamId !== action.payload),
            };
        case actionTypes.CREATE_TEAM:
            return {
                ...state,
                teams: [...state.teams, action.payload],
                loading: false,
                error: null,
            };
            case actionTypes.UPDATE_TEAM:
                return {
                  ...state,
                  teams: state.teams.map(team => {
                    if (team.teamId === action.payload.teamId) {
                      return action.payload;
                    }
                    return team;
                  }),
                  loading: false,
                  error: null,
                };
              default:
                return state;
            }
          };
export default teamReducer;