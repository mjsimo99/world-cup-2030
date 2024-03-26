// MatchAdminComponent.tsx
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { deleteMatch, fetchMatches } from '../../../redux/actions/matchActions';
import { fetchStadiums } from '../../../redux/actions/stadiumActions';
import Match from '../../../interfaces/match/match';
import DialogComponent from './DialogMatchComponent';
import { useAppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/reducers/RootState';
import { showConfirmationAlert, showSuccessAlert } from '../../../interceptor/sweetAlertUtils';


const MatchAdminComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { matches, loading, error } = useSelector((state: RootState) => state.match);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    useEffect(() => {
        dispatch(fetchMatches());
        dispatch(fetchStadiums());
    }, [dispatch]);

    const refreshData = async () => {
        await dispatch(fetchMatches());
        await dispatch(fetchStadiums());
    };

    const handleDeleteMatch = (matchId: number) => {
        showConfirmationAlert('Delete Match', 'Are you sure you want to delete this match?').then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteMatch(matchId));
                showSuccessAlert('Deleted!', 'The match has been deleted.');
                refreshData();
            }
        });
    };

    const handleUpdateMatch = (match: Match) => {
        setSelectedMatch(match);
        setDialogVisible(true);
    };

    return (
        <div className="card" style={{ width:'90%' , border: 'none' , display:'block'}}>
        <Button label="Create Match" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex mx-auto mt-5 mb-5" onClick={() => { setSelectedMatch(null); setDialogVisible(true); }} />
            <DialogComponent visible={dialogVisible} onHide={() => { setDialogVisible(false); setSelectedMatch(null); }} refreshData={refreshData} selectedMatch={selectedMatch} />
            <DataTable value={matches} loading={loading} loadingIcon="pi pi-spinner" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Match Name" />
                <Column field="ticketPrice" header="Ticket Price" />
                <Column field="ticketAvailable" header="Ticket Available" />
                <Column field="stadium.name" header="Stadium" />
                <Column header="Action" headerStyle={{ width: '8rem' }} body={(rowData: Match) => (
                    <div className='flex'>
                        <Button  icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => handleUpdateMatch(rowData)} />
                        <Button  icon="pi pi-trash" className="p-button-rounded p-button-danger text-red-500" onClick={() => handleDeleteMatch(rowData.matchId)} />
                    </div>
                )}></Column>
            </DataTable>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default MatchAdminComponent;