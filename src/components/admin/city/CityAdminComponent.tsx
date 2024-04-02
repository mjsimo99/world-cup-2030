


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { deleteCity, getCities } from '../../../redux/actions/cityActions';
import { useAppDispatch } from '../../../redux/store';
import City from '../../../interfaces/city/City';
import DialogCityComponent from './DialogCityComponent';
import { RootState } from '../../../redux/reducers/RootState';
import { showConfirmationAlert } from '../../../interceptor/sweetAlertUtils';


const CityAdminComponent: React.FC = () => {
    const { cities, loading, error } = useSelector((state: RootState) => state.city);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCities());
    }, [dispatch]);


    const handleUpdateCity = (city: City) => {
        setSelectedCity(city);
        setDialogVisible(true);
    }

    const handleDeleteCity = (cityId: number) => {
        showConfirmationAlert('Delete City', 'Are you sure you want to delete this city?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(deleteCity(cityId));
            refreshData();
          }
        });
      }
    

    const refreshData = async () => {
        await dispatch(getCities());

    }
    return (
        <div className="card" style={{ width: '90%', border: 'none', display: 'block' }}>

            <Button label="Create City" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex mx-auto mt-5 mb-5" onClick={() => { setSelectedCity(null); setDialogVisible(true); }} />
            <DialogCityComponent  visible={dialogVisible} onHide={() => { setDialogVisible(false); setSelectedCity(null); }} refreshData={refreshData} selectedCity={selectedCity} />
            <DataTable value={cities} loading={loading} loadingIcon="pi pi-spinner" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="cityId" header="City ID"></Column>
                <Column field="name" header="City Name"></Column>
                <Column header="Action" headerStyle={{ width: '8rem' }} body={(rowData: City) => (

                    <div className='flex'>
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => handleUpdateCity(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger text-red-500" onClick={() => handleDeleteCity(rowData.cityId)} />
                    </div>
                )}></Column>

            </DataTable>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default CityAdminComponent;
