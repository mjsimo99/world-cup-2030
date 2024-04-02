import { Dispatch } from 'redux';
import { GET_TEAM_Matches, GET_TEAM_Matches_ERROR, CREATE_TEAM_MATCH , DELETE_TEAM_MATCH, UPDATE_TEAM_MATCH, UPDATE_TEAM_MATCH_ERROR } from './actionTypes';
import ApiTeamMatch from '../api/apiTeamMatch';
import TeamMatch from '../../interfaces/team-match/TeamMatch';

export const fetchTeamMatches = () => {
    return async (dispatch: Dispatch) => {
        try {
        const teamMatches = await ApiTeamMatch.getTeamMatches();
        dispatch({ type: GET_TEAM_Matches, payload: teamMatches });
        } catch (error) {
        console.error("Error fetching team matches:", error);
        }
    }
    }

export const createTeamMatch = (teamMatchData: TeamMatch) => {
    return async (dispatch: Dispatch) => {
        try {
        const createdTeamMatch = await ApiTeamMatch.createTeamMatch(teamMatchData);
        dispatch({ type: CREATE_TEAM_MATCH, payload: createdTeamMatch });
        return createdTeamMatch;
        } catch (error) {
        console.error("Error creating team match:", error);
        throw error;
        }
    }
    }
    export const deleteTeamMatch = (teamId: number, matchId: number) => {
        return async (dispatch: Dispatch) => {
            try {
                const deletedTeamMatch = await ApiTeamMatch.deleteTeamMatch(teamId, matchId); // Pass teamId and matchId to the API call
                dispatch({ type: DELETE_TEAM_MATCH, payload: deletedTeamMatch });
                return deletedTeamMatch;
            } catch (error) {
                console.error("Error deleting team match:", error);
                throw error;
            }
        }
    }
    
    export const updateTeamMatch = (teamId: number, matchId: number, teamMatchData: TeamMatch) => {
        return async (dispatch: Dispatch) => {
            try {
                const updatedTeamMatch = await ApiTeamMatch.updateTeamMatch(teamId, matchId, teamMatchData); // Pass teamMatchData to the API call
                dispatch({ type: UPDATE_TEAM_MATCH, payload: updatedTeamMatch });
                return updatedTeamMatch;
            } catch (error) {
                console.error("Error updating team match:", error);
                dispatch({ type: UPDATE_TEAM_MATCH_ERROR, payload: error });
                throw error; 
            }
        }
    }
    
    
