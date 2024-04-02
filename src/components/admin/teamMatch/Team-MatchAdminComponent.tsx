// StadiumAdminComponent.tsx
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { deleteTeamMatch , fetchTeamMatches } from '../../../redux/actions/TeamMatchActions';
import { getTeams } from '../../../redux/actions/teamActions';
import { fetchMatches } from '../../../redux/actions/matchActions';
import TeamMatch from '../../../interfaces/team-match/TeamMatch';
import DialogComponent from './DialogTeam-MatchComponent';
import { useAppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/reducers/RootState';
import { showConfirmationAlert } from '../../../interceptor/sweetAlertUtils';


const TeamMatchAdminComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { teamMatches, loading, error } = useSelector((state: RootState) => state.teamMatches);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [selectedTeamMatch, setSelectedTeamMatch] = useState<TeamMatch | null>(null);

    useEffect(() => {
        dispatch(fetchTeamMatches());
    }, [dispatch]);

    const refreshData = async () => {
        await dispatch(fetchTeamMatches());
        await dispatch(getTeams());
        await dispatch(fetchMatches());
    };

    const handleDeleteTeamMatch = (teamId: number, matchId: number) => {
        showConfirmationAlert('Delete Team Match', 'Are you sure you want to delete this team match?').then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteTeamMatch(teamId, matchId));
                refreshData();
            }
        });
    };
    
    if (loading) {
        return <div>Loading...</div>; // or any loading indicator
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }
    const handleUpdateTeamMatch = (teamMatch: TeamMatch) => {
        setDialogVisible(true);

        setSelectedTeamMatch(teamMatch);
    };

    return (
        <div className="card" style={{ width:'90%' , border: 'none' , display:'block'}}>
            <Button label="Create Team Match" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex mx-auto mt-5 mb-5" onClick={() => { setSelectedTeamMatch(null); setDialogVisible(true); }} />
            <DialogComponent visible={dialogVisible} onHide={() => { setDialogVisible(false); setSelectedTeamMatch(null); }} refreshData={refreshData} selectedTeamMatch={selectedTeamMatch} />
            <DataTable value={teamMatches} loading={loading} loadingIcon="pi pi-spinner" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="teamsName" header="Team Name" />
                <Column field="date" header="Match Date" />
                <Column field="time" header="Match Time" />
                <Column field="team.country" header="team" />
                <Column field="match.name" header="match" />
                <Column header="Action" headerStyle={{ width: '8rem' }} body={(rowData: TeamMatch) => (
                    <div className='flex'>
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary" onClick={() => handleUpdateTeamMatch(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger text-red-500" onClick={() => handleDeleteTeamMatch(rowData.team.teamId, rowData.match.matchId)} />
                    </div>
                )}></Column>
            </DataTable>

            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default TeamMatchAdminComponent;
