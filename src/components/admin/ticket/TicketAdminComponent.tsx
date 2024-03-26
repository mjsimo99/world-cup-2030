// TicketAdminComponent.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { deleteTicket, getTickets } from '../../../redux/actions/ticketAction';
import { fetchMatches } from '../../../redux/actions/matchActions';
import { getClients } from '../../../redux/actions/clientAction';
import Ticket from '../../../interfaces/ticket/Ticket';
import DialogTicketForm from './DialogTicketComponent';
import { useAppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/reducers/RootState';
import { showConfirmationAlert, showSuccessAlert } from '../../../interceptor/sweetAlertUtils';

const TicketAdminComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { tickets, loading, error } = useSelector((state: RootState) => state.ticket);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    const refreshData = async () => {
        await dispatch(getTickets());
        await dispatch(getClients());
        await dispatch(fetchMatches());
    };

    const handleDeleteTicket = (ticketId: number) => {
        showConfirmationAlert('Delete Ticket', 'Are you sure you want to delete this ticket?').then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteTicket(ticketId));
                showSuccessAlert('Deleted!', 'The ticket has been deleted.');
                refreshData();
            }
        });

    };

    const handleUpdateTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setDialogVisible(true);
    };

    return (
        <div className="card" style={{ width:'90%' , border: 'none' , display:'block'}}>
            <Button label="Create Ticket" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex mx-auto mt-5 mb-5" onClick={() => { setSelectedTicket(null); setDialogVisible(true); }} />
            <DialogTicketForm visible={dialogVisible} onHide={() => { setDialogVisible(false); setSelectedTicket(null); }} refreshData={refreshData} selectedTicket={selectedTicket} />
            <DataTable value={tickets} loading={loading} loadingIcon="pi pi-spinner" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="quantity" header="Quantity"></Column>
                <Column field="client.firstName" header="Client"></Column>
                <Column header="Match" body={(rowData: Ticket) => <span>{rowData.match?.name}</span>} />
                <Column header="Action" headerStyle={{ width: '8rem' }} body={(rowData: Ticket) => (
                    <div className='flex'>
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => handleUpdateTicket(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger text-red-500" onClick={() => handleDeleteTicket(rowData.ticketId)} />
                    </div>
                )}></Column>
            </DataTable>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default TicketAdminComponent;