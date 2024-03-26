


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { deleteClient, getClients } from '../../../redux/actions/clientAction';
import { useAppDispatch } from '../../../redux/store';
import Client from '../../../interfaces/client/Client';
import DialogClientComponent from './DialogClientComponent';
import { RootState } from '../../../redux/reducers/RootState';
import { showConfirmationAlert, showSuccessAlert } from '../../../interceptor/sweetAlertUtils';


const ClientAdminComponent: React.FC = () => {
    const { clients, loading, error } = useSelector((state: RootState) => state.client);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    const handleUpdateClient = (client: Client) => {
        setSelectedClient(client);
        setDialogVisible(true);
    }

    const handleDeleteClient = (clientId: number) => {
        showConfirmationAlert('Delete Client', 'Are you sure you want to delete this client?').then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteClient(clientId));
                showSuccessAlert('Deleted!', 'The client has been deleted.');
                refreshData();
            }
        });
    }
    const refreshData = async () => {
        await dispatch(getClients());

    }

    return (
        <div className="card" style={{ width:'90%' , border: 'none' , display:'block'}}>

            <DialogClientComponent visible={dialogVisible} onHide={() => { setDialogVisible(false); setSelectedClient(null); }} refreshData={refreshData} selectedClient={selectedClient} />
            <DataTable value={clients} loading={loading} loadingIcon="pi pi-spinner" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="clientId" header="Client ID"></Column>
                <Column field="firstName" header="First Name"></Column>
                <Column field="lastName" header="Last Name"></Column>
                <Column field="dateOfBirth" header="Date of Birth"></Column>
                <Column field="phoneNumber" header="Phone Number"></Column>
                <Column field="address" header="Address"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="username" header="Username"></Column>
                <Column header="Action" headerStyle={{ width: '8rem' }} body={(rowData: Client) => (
                    <div className='flex'>
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => handleUpdateClient(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger text-red-500" onClick={() => handleDeleteClient(rowData.clientId)} />
                    </div>
                )}></Column>
            </DataTable>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default ClientAdminComponent;