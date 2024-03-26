// DialogTeamForm.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { createTeamMatch, updateTeamMatch } from '../../../redux/actions/TeamMatchActions';
import TeamMatch from '../../../interfaces/team-match/TeamMatch';
import { useAppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/reducers/RootState';
import { useSelector } from 'react-redux';
import { getTeams } from '../../../redux/actions/teamActions';
import { fetchMatches } from '../../../redux/actions/matchActions';
import Team from '../../../interfaces/team/Team';
import Match from '../../../interfaces/match/match';
import { showConfirmationAlert, showSuccessAlert } from '../../../interceptor/sweetAlertUtils';

interface DialogTeamMatchComponentProps {
  visible: boolean;
  onHide: () => void;
  refreshData: () => void;
  selectedTeamMatch?: TeamMatch | null;
}

const DialogTeamMatchComponent: React.FC<DialogTeamMatchComponentProps> = ({ visible, onHide, refreshData, selectedTeamMatch }) => {
  const dispatch = useAppDispatch();
  const { teams } = useSelector((state: RootState) => state.team);
  const { matches } = useSelector((state: RootState) => state.match);
  const [teamMatchData, setTeamMatchData] = useState<TeamMatch>({
    teamId: 0,
    matchId: 0,
    teamsName: '',
    date: '',
    time: '',
    team: {} as Team,
    match: {} as Match
  });

  useEffect(() => {
    dispatch(getTeams());
    dispatch(fetchMatches());
  }, [dispatch]);

  useEffect(() => {
    setTeamMatchData(selectedTeamMatch || { time: '', date: '', teamsName: '', matchId: 0, teamId: 0, team: {} as Team, match: {} as Match });
  }, [selectedTeamMatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamMatchData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveTeamMatch = async () => {
    try {
      if (selectedTeamMatch) {
        showConfirmationAlert('Update Team Match', 'Are you sure you want to update this team match?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(updateTeamMatch(selectedTeamMatch.team.teamId, selectedTeamMatch.match.matchId, teamMatchData));
            showSuccessAlert('Updated!', 'The team match has been updated.');
            refreshData();
          }
        });
      } else {
        showConfirmationAlert('Create Team Match', 'Are you sure you want to create a new team match?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(createTeamMatch(teamMatchData));
            showSuccessAlert('Created!', 'The team match has been created.');
            refreshData();
          }
        });
      }
      onHide();
    } catch (error) {
      console.error('Failed to save team match:', error);
    }
  };

  return (
    <Dialog visible={visible} onHide={onHide} className="p-4 rounded-lg bg-white shadow-md" style={{ width: '600px' }} header={selectedTeamMatch ? "Update Team Match" : "Create Team Match"}>
      {!selectedTeamMatch && (
        <>

          <div className="p-field mb-4">
            <label htmlFor="team" className="block text-gray-700">Team</label>
            <select name="teamId" value={teamMatchData.teamId} onChange={(e) => setTeamMatchData(prevData => ({ ...prevData, teamId: parseInt(e.target.value) }))} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Team</option>
              {teams.map(team => (
                <option key={team.teamId} value={team.teamId}>{team.country}</option>
              ))}
            </select>
          </div>
          <div className="p-field">
            <label htmlFor="match">Match</label>
            <select name="matchId" value={teamMatchData.matchId} onChange={(e) => setTeamMatchData(prevData => ({ ...prevData, matchId: parseInt(e.target.value) }))} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Match</option>
              {matches.map(match => (
                <option key={match.matchId} value={match.matchId}>{match.matchId}</option>
              ))}
            </select>
          </div>
        </>
      )}
      <div className="p-field mb-4 mt-4">
        <label htmlFor="teamsName">Team Name</label>
        <input id="teamsName" name="teamsName" type="text" value={teamMatchData.teamsName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field mb-4">
        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" value={teamMatchData.date} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field mb-4">
        <label htmlFor="time">Time</label>
        <input id="time" name="time" type="time" value={teamMatchData.time} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field flex justify-center items-center">
        <Button label="Save" onClick={handleSaveTeamMatch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" />
        <Button label="Cancel"  onClick={onHide} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" />
      </div>
    </Dialog>
  );
}

export default DialogTeamMatchComponent;
