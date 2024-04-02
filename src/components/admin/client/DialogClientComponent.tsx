import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { updateClient } from '../../../redux/actions/clientAction';
import Client from '../../../interfaces/client/Client';
import { useAppDispatch } from '../../../redux/store';
import { showConfirmationAlert } from '../../../interceptor/sweetAlertUtils';


interface DialogClientComponentProps {
    visible: boolean;
    onHide: () => void;
    refreshData: () => void;
    selectedClient?: Client | null;
}

const DialogClientComponent: React.FC<DialogClientComponentProps> = ({ visible, onHide, refreshData, selectedClient }) => {
    const dispatch = useAppDispatch();
    const [clientData, setClientData] = useState<Partial<Client>>({ firstName: '', lastName: '', dateOfBirth: '', phoneNumber: '', address: '', email: '', username: '', password: '' , money: 0});

    useEffect(() => {
        if (selectedClient) {
            setClientData(selectedClient);
        } else {
            setClientData({ firstName: '', lastName: '', dateOfBirth: '', phoneNumber: '', address: '', email: '', username: '', password: '' , money: 0});
        }
    }, [selectedClient]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSaveClient = async () => {
        try {
            if (selectedClient) {
                showConfirmationAlert('Update clinet', 'Are you sure you want to update this client?').then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(updateClient(selectedClient.clientId, clientData));
                        refreshData();
                    }
                });
            }
            onHide();
        } catch (error) {
            console.error('Error saving client:', error);
        }
    };

    return (
        <Dialog header="Update Client" visible={visible} style={{ width: '450px' }} modal className="p-fluid" onHide={onHide}>
            <div className="p-field">
                <label htmlFor="firstName" className='block text-gray-700'>First Name</label>
                <input id="firstName" name="firstName" type="text" value={clientData.firstName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="p-field">
                <label htmlFor="lastName" className='block text-gray-700'>Last Name</label>
                <input id="lastName" name="lastName" type="text" value={clientData.lastName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="p-field">
                <label htmlFor="dateOfBirth" className='block text-gray-700'>Date of Birth</label>
                <input id="dateOfBirth" name="dateOfBirth" type="text" value={clientData.dateOfBirth} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="p-field">
                <label htmlFor="phoneNumber" className='block text-gray-700'>Phone Number</label>
                <input id="phoneNumber" name="phoneNumber" type="text" value={clientData.phoneNumber} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="p-field">
                <label htmlFor="address" className='block text-gray-700'>Address</label>
                <input id="address" name="address" type="text" value={clientData.address} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="p-field">
                <label htmlFor="email" className='block text-gray-700'>Email</label>
                <input id="email" name="email" type="text" value={clientData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            {/* <div className="p-field">
            <label htmlFor="username" className='block text-gray-700'>Username</label>
            <input id="username" name="username" type="text" value={clientData.username} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="p-field">
            <label htmlFor="password" className='block text-gray-700'>Password</label>
            <input id="password" name="password" type="text" value={clientData.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div> */}
            <div className="p-field">
                <label htmlFor="money" className='block text-gray-700'>Money</label>
                <input id="money" name="money" type="number" value={clientData.money} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="p-field flex justify-center items-center mt-4 mb-4">
                <Button label="Save" onClick={handleSaveClient} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 w-20" />
                <Button label="Cancel" onClick={onHide} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  w-24" />
            </div>
        </Dialog>
    );
};

export default DialogClientComponent;


