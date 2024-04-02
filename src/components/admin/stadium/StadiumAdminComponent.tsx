// StadiumAdminComponent.tsx
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { deleteStadium, fetchStadiums } from '../../../redux/actions/stadiumActions';
import { getCities } from '../../../redux/actions/cityActions';
import Stadium from '../../../interfaces/stadium/Stadiums';
import DialogComponent from './DialogStaduimComponent';
import { useAppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/reducers/RootState';
import { showConfirmationAlert } from '../../../interceptor/sweetAlertUtils';

const StadiumAdminComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { stadiums, loading, error } = useSelector((state: RootState) => state.stadium);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);

    useEffect(() => {
        dispatch(fetchStadiums());
    }, [dispatch]);
    

    const refreshData = async () => {
        await dispatch(fetchStadiums());
        await dispatch(getCities());
    };

    const handleDeleteStadium = (stadiumId: number) => {
        showConfirmationAlert('Delete Stadium', 'Are you sure you want to delete this stadium?').then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteStadium(stadiumId));
                refreshData();
            }
        });
    };

    const handleUpdateStadium = (stadium: Stadium) => {
        setSelectedStadium(stadium);
        setDialogVisible(true);
    };

    return (
        <div className="card" style={{ width:'90%' , border: 'none' , display:'block'}}>
        <Button label="Create Stadium" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex mx-auto mt-5 mb-5" onClick={() => { setSelectedStadium(null); setDialogVisible(true); }} />
            <DialogComponent visible={dialogVisible} onHide={() => { setDialogVisible(false); setSelectedStadium(null); }} refreshData={refreshData} selectedStadium={selectedStadium} />
            <DataTable value={stadiums} loading={loading} loadingIcon="pi pi-spinner" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Stadium Name" />
                <Column field="city.name" header="City" />
                <Column field="capacity" header="Capacity" />
                <Column field="location" header="Location" />
                <Column header="Action" headerStyle={{ width: '8rem' }} body={(rowData: Stadium) => (
                    <div className='flex'>
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => handleUpdateStadium(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger text-red-500" onClick={() => handleDeleteStadium(rowData.stadiumId)} />
                    </div>
                )}></Column>
            </DataTable>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default StadiumAdminComponent;
