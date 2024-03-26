// DialogMatchComponent.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { createMatch, updateMatch } from '../../../redux/actions/matchActions';
import Match from '../../../interfaces/match/match';
import { useAppDispatch } from '../../../redux/store';
import Stadium from '../../../interfaces/stadium/Stadiums';
import { RootState } from '../../../redux/reducers/RootState';
import { useSelector } from 'react-redux';
import { fetchStadiums } from '../../../redux/actions/stadiumActions';
import { showConfirmationAlert, showSuccessAlert } from '../../../interceptor/sweetAlertUtils';


interface DialogMatchComponentProps {
  visible: boolean;
  onHide: () => void;
  refreshData: () => void;
  selectedMatch?: Match | null;
}

const DialogMatchComponent: React.FC<DialogMatchComponentProps> = ({ visible, onHide, refreshData, selectedMatch }) => {
  const dispatch = useAppDispatch();
  const { stadiums } = useSelector((state: RootState) => state.stadium);
  const [matchData, setMatchData] = useState<Partial<Match>>(selectedMatch || { ticketPrice: 0, ticketAvailable: 0, staduim: {} as Stadium, name: '' });

  useEffect(() => {
    dispatch(fetchStadiums());
  }, [dispatch]);
  useEffect(() => {
    setMatchData(selectedMatch || { ticketPrice: 0, ticketAvailable: 0, staduim: {} as Stadium, name: '' });
  }, [selectedMatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMatchData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveMatch = async () => {
    try {
      if (selectedMatch) {
        showConfirmationAlert('Update Match', 'Are you sure you want to update this match?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(updateMatch(selectedMatch.matchId, matchData));
            showSuccessAlert('Updated!', 'The match has been updated.');
            refreshData();
          }
        });
      } else {
        showConfirmationAlert('Create Match', 'Are you sure you want to create a new match?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(createMatch(matchData));
            showSuccessAlert('Created!', 'The match has been created.');
            refreshData();

          }
        });
      }
      onHide();
    } catch (error) {
      console.error('Failed to save match:', error);
    }
  };
  const handleStadiumChange = (selectedStadiumId: number) => {
    const selectedStadium = stadiums.find(stadium => stadium.stadiumId === selectedStadiumId);
    if (selectedStadium) {
      setMatchData(prevData => ({ ...prevData, staduim: selectedStadium, stadiumId: selectedStadium.stadiumId }));
    } else {
      console.error("Selected stadium not found");
    }
  };
  return (
    <Dialog visible={visible} onHide={onHide} className="p-4 rounded-lg bg-white shadow-md" style={{ width: '600px' }} header={selectedMatch ? "Update Match" : "Create Match"} >

      <div className="p-field mb-4">
        <label htmlFor="name" className="block text-gray-700">Match Name</label>
        <input id="name" type="text" name="name" value={matchData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field mb-4">
        <label htmlFor="name" className="block text-gray-700">Ticket Price</label>
        <input id="ticketPrice" type="number" name="ticketPrice" value={matchData.ticketPrice} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field mb-4">
        <label htmlFor="name" className="block text-gray-700">Ticket Available</label>
        <input id="ticketAvailable" type="number" name="ticketAvailable" value={matchData.ticketAvailable} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field mb-4">
        <label htmlFor="stadium" className="block text-gray-700">Stadium</label>
        <select id="stadium" name="stadium" value={matchData.staduim?.stadiumId} onChange={(e) => handleStadiumChange(parseInt(e.target.value))} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option value="">Select Stadium</option>
          {stadiums.map(stadium => <option key={stadium.stadiumId} value={stadium.stadiumId}>{stadium.name}</option>)}
        </select>
      </div>
      <div className="p-field flex justify-center items-center">
        <Button label="Save" onClick={handleSaveMatch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" />
        <Button label="Cancel" onClick={onHide} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" />
      </div>
    </Dialog>
  );
}

export default DialogMatchComponent;