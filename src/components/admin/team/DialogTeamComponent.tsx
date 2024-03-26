// DialogTeamForm.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { createTeam, updateTeam } from '../../../redux/actions/teamActions';
import Team from '../../../interfaces/team/Team';
import { useAppDispatch } from '../../../redux/store';
import { uploadFile } from '../../../redux/actions/fileActions';
import { showConfirmationAlert, showSuccessAlert } from '../../../interceptor/sweetAlertUtils';

interface DialogTeamFormProps {
  visible: boolean;
  onHide: () => void;
  refreshData: () => void;
  selectedTeam?: Team | null;
}

const DialogTeamForm: React.FC<DialogTeamFormProps> = ({ visible, onHide, refreshData, selectedTeam }) => {
  const dispatch = useAppDispatch();
  const [teamData, setTeamData] = useState<Partial<Team>>({ country: '', coach: '', logo: '' });

  useEffect(() => {
    setTeamData(selectedTeam || { country: '', coach: '', logo: '' });
  }, [selectedTeam]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'logo' && files) {
      const file = files[0];
      try {
        const logoUrl = await uploadFile(file);
        setTeamData(prevData => ({ ...prevData, logo: logoUrl }));
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      setTeamData(prevData => ({ ...prevData, [name]: value }));
    }
  };


  const handleSaveTeam = async () => {
    try {
      if (!selectedTeam) {
        showConfirmationAlert('Create Team', 'Are you sure you want to create a new team?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(createTeam(teamData as Team));
            showSuccessAlert('Created!', 'The team has been created.');
            refreshData();
          }
        });
      } else {
        showConfirmationAlert('Update Team', 'Are you sure you want to update this team?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(updateTeam(selectedTeam.teamId, teamData as Team));
            showSuccessAlert('Updated!', 'The team has been updated.');
            refreshData();
          }
        });
      }
      onHide();
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  return (
    <Dialog header={selectedTeam ? 'Update Team' : 'Create Team'} visible={visible} style={{ width: '450px' }} modal className="p-fluid" onHide={onHide}>
      <div className="p-field mb-4">
        <label htmlFor="country" className='block text-gray-700'>Country</label>
        <input id="country" name="country" type="text" value={teamData.country} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field mb-4">
        <label htmlFor="coach" className='block text-gray-700'>Coach</label>
        <input id="coach" name="coach" type="text" value={teamData.coach} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field mb-4">
        <label htmlFor="logo" className='block text-gray-700'>Logo</label>
        <input id="logo" name="logo" type="file" onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="p-field flex justify-center items-center mt-4 mb-4">
        <Button label="Save" onClick={handleSaveTeam} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 w-20" />
        <Button label="Cancel" onClick={onHide} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  w-24" />
      </div>
    </Dialog>
  );
};

export default DialogTeamForm;
