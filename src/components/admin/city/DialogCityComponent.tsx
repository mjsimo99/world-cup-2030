import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { createCity, updateCity } from '../../../redux/actions/cityActions';
import City from '../../../interfaces/city/City';
import { useAppDispatch } from '../../../redux/store';
import { showConfirmationAlert } from '../../../interceptor/sweetAlertUtils';



interface DialogCityComponentProps {
  visible: boolean;
  onHide: () => void;
  refreshData: () => void;
  selectedCity?: City | null;
}

const DialogCityComponent: React.FC<DialogCityComponentProps> = ({ visible, onHide, refreshData, selectedCity }) => {
  const dispatch = useAppDispatch();
  const [cityData, setCityData] = useState<Partial<City>>({ name: '' });


  useEffect(() => {
    if (selectedCity) {
      setCityData(selectedCity);
    } else {
      setCityData({ name: '' });
    }
  }, [selectedCity]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCityData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveCity = async () => {
    try {
      if (!selectedCity) {
        showConfirmationAlert('Create City', 'Are you sure you want to create a new city?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(createCity(cityData as City));
            refreshData();
          }
        });
      } else {
        showConfirmationAlert('Update City', 'Are you sure you want to update this city?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(updateCity(selectedCity.cityId, cityData as City));
            refreshData();
          }
        });
      }
      onHide();
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };





  return (
    <Dialog header={selectedCity ? 'Update City' : 'Create City'} visible={visible} style={{ width: '450px' }}
      modal className="p-fluid" onHide={onHide} >
      <div className="p-field">
        <label htmlFor="name" className='block text-gray-700'>City Name</label>
        <input id="name" name="name" type="text" value={cityData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 " />
      </div>
      <div className="p-field flex justify-center items-center mt-4 mb-4">
        <Button label="Save" onClick={handleSaveCity} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 w-20" />
        <Button label="Cancel" onClick={onHide} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  w-24" />
      </div>
    </Dialog>
  );
};

export default DialogCityComponent;
