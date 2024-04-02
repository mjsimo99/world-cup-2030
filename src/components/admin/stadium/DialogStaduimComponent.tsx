// DialogStadiumComponent.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { createStadium, updateStadium } from '../../../redux/actions/stadiumActions';
import Stadium from '../../../interfaces/stadium/Stadiums';
import { useAppDispatch } from '../../../redux/store';
import City from '../../../interfaces/city/City';
import { RootState } from '../../../redux/reducers/RootState';
import { useSelector } from 'react-redux';
import { getCities } from '../../../redux/actions/cityActions';
import { showConfirmationAlert } from '../../../interceptor/sweetAlertUtils';


interface DialogStadiumComponentProps {
  visible: boolean;
  onHide: () => void;
  refreshData: () => void;
  selectedStadium?: Stadium | null;
}

const DialogStadiumComponent: React.FC<DialogStadiumComponentProps> = ({ visible, onHide, refreshData, selectedStadium }) => {
  const dispatch = useAppDispatch();
  const { cities } = useSelector((state: RootState) => state.city);
  const [stadiumData, setStadiumData] = useState<Partial<Stadium>>(selectedStadium || { name: '', capacity: 0, location: '', city: {} as City, matches: [] });

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);
  
  useEffect(() => {
    setStadiumData(selectedStadium || { name: '', capacity: 0, location: '', city: {} as City, matches: [] });
  }, [selectedStadium]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStadiumData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveStadium = async () => {
    if (!stadiumData.name || !stadiumData.capacity || !stadiumData.location || !stadiumData.city?.cityId) {
      alert('Please fill out all required fields.');
      return;
  }
    try {
      if (selectedStadium) {
        showConfirmationAlert('Update Stadium', 'Are you sure you want to update this stadium?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(updateStadium(selectedStadium.stadiumId, stadiumData));
            refreshData();
          }
        });
      } else {
        showConfirmationAlert('Create Stadium', 'Are you sure you want to create a new stadium?').then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(createStadium(stadiumData));
            refreshData();
          }
        });
      }
      onHide();
    } catch (error) {
      console.error('Failed to save stadium:', error);
    }
  };
  const handleCityChange = (selectedCityId: number) => {
    const selectedCity = cities.find(city => city.cityId === selectedCityId);
    if (selectedCity) {
      setStadiumData(prevData => ({ ...prevData, city: selectedCity, cityId: selectedCity.cityId }));
    } else {
      console.error("Selected city not found");
    }
  };



  return (
    <Dialog visible={visible} onHide={onHide} className="p-4 rounded-lg bg-white shadow-md" style={{ width: '600px' }} header={selectedStadium ? "Update Stadium" : "Create Stadium"}>
      <div className="p-field mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input id="name" type="text" name="name" value={stadiumData.name || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
      </div>
      <div className="p-field mb-4">
        <label htmlFor="capacity" className="block text-gray-700">Capacity</label>
        <input id="capacity" type="number" name="capacity" value={stadiumData.capacity || 0} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" max={999999} min={20000} required/>
      </div>
      <div className="p-field mb-4">
        <label htmlFor="location" className="block text-gray-700">Location</label>
        <input id="location" type="text" name="location" value={stadiumData.location || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
      </div>
      <div className="p-field mb-4">
        <label htmlFor="city" className="block text-gray-700">City</label>
        <select
          id="city"
          name="city"
          value={stadiumData.city?.cityId || ''}
          onChange={(e) => handleCityChange(parseInt(e.target.value))}
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select a city</option>
          {cities.map(city => (
            <option key={city.cityId} value={city.cityId}>{city.name}</option>
          ))}
        </select>
      </div>
      <div className="p-field flex justify-center items-center">
        <Button label="Save" onClick={handleSaveStadium} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" />
        <Button label="Cancel" onClick={onHide} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" />
      </div>
    </Dialog>
  );
}

export default DialogStadiumComponent;
