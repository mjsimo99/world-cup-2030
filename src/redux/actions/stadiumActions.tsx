// stadiumActions.ts
import { Dispatch } from 'redux';
import { GET_STADIUMS, DELETE_STADIUM, CREATE_STADIUM, UPDATE_STADIUM } from './actionTypes'; // Assuming you have actionTypes defined
import ApiStadium from '../api/apiStadium';
import Stadium from '../../interfaces/stadium/Stadiums';


export const fetchStadiums = () => {
  return async (dispatch: Dispatch) => {
    try {
      const stadiums = await ApiStadium.getStadiums();
      dispatch({ type: GET_STADIUMS, payload: stadiums });
    } catch (error) {
      console.error("Error fetching stadiums:", error);
    }
  }
}

export const deleteStadium = (stadiumId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await ApiStadium.deleteStadium(stadiumId);
      dispatch({ type: DELETE_STADIUM, payload: stadiumId });
    } catch (error) {
      console.error("Error deleting stadium:", error);
    }
  }
}

export const createStadium = (stadiumData: Partial<Stadium>) => {
    return async (dispatch: Dispatch) => {
      try {
        const createdStadium = await ApiStadium.createStadium(stadiumData as Stadium)
        dispatch({ type: CREATE_STADIUM, payload: createdStadium });
        return createdStadium; 
      } catch (error) {
        console.error("Error creating stadium:", error);
        throw error; 
      }
    }
  }

export const updateStadium = (stadiumId: number, stadiumData: Partial<Stadium>) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedStadium = await ApiStadium.updateStadium(stadiumId, stadiumData  as Stadium)
      dispatch({ type: UPDATE_STADIUM, payload: updatedStadium });
    } catch (error) {
      console.error("Error updating stadium:", error);
    }
  }
}
