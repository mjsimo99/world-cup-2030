// TeamAdminComponent.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { deleteTeam, getTeams } from '../../../redux/actions/teamActions';
import Team from '../../../interfaces/team/Team';
import { useAppDispatch } from '../../../redux/store';
import DialogTeamComponent from './DialogTeamComponent';
import { RootState } from '../../../redux/reducers/RootState';
import { showConfirmationAlert, showSuccessAlert } from '../../../interceptor/sweetAlertUtils';

const TeamAdminComponent: React.FC = () => {
  const { teams, loading, error } = useSelector((state: RootState) => state.team);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const refreshData = async () => {
    await dispatch(getTeams());
  };

  const handleUpdateTeam = (team: Team) => {
    setSelectedTeam(team);
    setDialogVisible(true);
  }

  const handleDeleteTeam = (teamId: number) => {
    showConfirmationAlert('Delete Team', 'Are you sure you want to delete this team?').then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteTeam(teamId));
        showSuccessAlert('Deleted!', 'The team has been deleted.');
        refreshData();
      }
    });
  }

  const logoBodyTemplate = (rowData: any) => {
    return (
      <img src={rowData.logo} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '30px' }} className="p-shadow-2" />
    );
  };

  return (
    <div className="card" style={{ width:'90%' , border: 'none' , display:'block'}}>
    <Button label="Create Team" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex mx-auto mt-5 mb-5" onClick={() => { setSelectedTeam(null); setDialogVisible(true); }} />
      <DialogTeamComponent visible={dialogVisible} onHide={() => { setDialogVisible(false); setSelectedTeam(null); }} refreshData={refreshData} selectedTeam={selectedTeam} />
      <DataTable value={teams} loading={loading} loadingIcon="pi pi-spinner" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column field="logo" header="flag" body={logoBodyTemplate}></Column>
        <Column field="country" header="Country"></Column>
        <Column field="coach" header="Coach"></Column>
        <Column header="Action" headerStyle={{ width: '8rem' }} body={(rowData: Team) => (
          <div className='flex'>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => handleUpdateTeam(rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger text-red-500" onClick={() => handleDeleteTeam(rowData.teamId)} />
          </div>
        )}></Column>
      </DataTable>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default TeamAdminComponent;
