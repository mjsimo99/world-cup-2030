import { Dispatch } from 'redux';
import { GET_MATCHES, DELETE_MATCH, CREATE_MATCH, UPDATE_MATCH } from './actionTypes'; // Assuming you have actionTypes defined
import ApiMatch from '../api/apiMatch';
import Match from '../../interfaces/match/match';

export const fetchMatches = () => {
  return async (dispatch: Dispatch) => {
    try {
      const matches = await ApiMatch.getMatches();
      dispatch({ type: GET_MATCHES, payload: matches });
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }
}

export const deleteMatch = (matchId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await ApiMatch.deleteMatch(matchId);
      dispatch({ type: DELETE_MATCH, payload: matchId });
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  }
}

export const createMatch = (matchData: Partial<Match>) => {
    return async (dispatch: Dispatch) => {
      try {
        const createdMatch = await ApiMatch.createMatch(matchData);
        dispatch({ type: CREATE_MATCH, payload: createdMatch });
        return createdMatch;
      } catch (error) {
        console.error("Error creating match:", error);
        throw error; 
      }
    }
  }

export const updateMatch = (matchId: number, matchData: Partial<Match>) => {
    return async (dispatch: Dispatch) => {
        try {
        const updatedMatch = await ApiMatch.updateMatch(matchId, matchData);
        dispatch({ type: UPDATE_MATCH, payload: updatedMatch });
        } catch (error) {
        console.error("Error updating match:", error);
        }
    }
    }