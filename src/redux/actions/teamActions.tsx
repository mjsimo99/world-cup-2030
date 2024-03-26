import { Dispatch } from 'redux';
import { GET_TEAMS, CREATE_TEAM, DELETE_TEAM, UPDATE_TEAM } from './actionTypes';
import ApiTeam

from '../api/apiTeam';
import axios from 'axios';
import Team from '../../interfaces/team/Team';

export const getTeams = () => {
  return async (dispatch: Dispatch) => {
    try {
      const teams = await ApiTeam.getTeams();
      dispatch({ type: GET_TEAMS, payload: teams });
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
};

export const deleteTeam = (teamId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await ApiTeam.deleteTeam(teamId);
      dispatch({ type: DELETE_TEAM, payload: teamId });
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };
};

export const createTeam = (teamData: Team) => {
  return async (dispatch: Dispatch) => {
    try {
      const createdTeam = await ApiTeam.createTeam(teamData);
      dispatch({ type: CREATE_TEAM, payload: createdTeam });
      return createdTeam;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  };
};

export const updateTeam = (teamId: number, teamData: Team) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedTeam = await ApiTeam.updateTeam(teamId, teamData);
      dispatch({ type: UPDATE_TEAM, payload: updatedTeam });
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };
};


