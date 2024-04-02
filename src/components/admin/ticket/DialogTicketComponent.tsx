//DialogTicketFrom.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { createTicket , updateTicket } from '../../../redux/actions/ticketAction';
import Ticket from '../../../interfaces/ticket/Ticket';
import { useAppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/reducers/RootState';
import { useSelector } from 'react-redux';
import Client from '../../../interfaces/client/Client';
import Match from '../../../interfaces/match/match';
import { getClients } from '../../../redux/actions/clientAction';
import { fetchMatches } from '../../../redux/actions/matchActions';
import { showConfirmationAlert } from '../../../interceptor/sweetAlertUtils';

interface DialogTicketFormProps {
  visible: boolean;
  onHide: () => void;
  refreshData: () => void;
  selectedTicket?: Ticket | null;
}



const DialogTicketForm: React.FC<DialogTicketFormProps> = ({ visible, onHide, refreshData, selectedTicket }) => {
    const dispatch = useAppDispatch();
    const { clients } = useSelector((state: RootState) => state.client);
    const { matches } = useSelector((state: RootState) => state.match);
    const [ticketData, setTicketData] = useState<Partial<Ticket>>(selectedTicket || { quantity: 0, client: {} as Client, match: {} as Match });

    useEffect(() => {
        dispatch(getClients());
        dispatch(fetchMatches());
    }, [dispatch]);
    useEffect(() => {
        setTicketData(selectedTicket || { quantity: 0, client: {} as Client, match: {} as Match });
    }, [selectedTicket]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTicketData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSaveTicket = async () => {
        if (!ticketData.quantity || !ticketData.client?.clientId || !ticketData.match?.matchId) {
            alert('Please fill out all required fields.');
            return;
        }
        try {
            if (selectedTicket) {
                showConfirmationAlert('Update Ticket', 'Are you sure you want to update this ticket?').then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(updateTicket(selectedTicket.ticketId, ticketData));
                        refreshData();
                    }
                });
            } else {
                showConfirmationAlert('Create Ticket', 'Are you sure you want to create a new ticket?').then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(createTicket(ticketData));
                        refreshData();
                    }
                });
            }
            onHide();
        } catch (error) {
            console.error('Failed to save ticket:', error);
        }
    };

    const handleClientChange = (selectedClientId: number) => {
        const selectedClient = clients.find(client => client.clientId === selectedClientId);
        if (selectedClient) {
            setTicketData(prevData => ({ ...prevData, client: selectedClient, clientId: selectedClient.clientId }));
        } else {
            console.error("Selected client not found");
        }
    };
    const handleMatchChange = (selectedMatchId: number) => {
        const selectedMatch = matches.find(match => match.matchId === selectedMatchId);
        if (selectedMatch) {
            setTicketData(prevData => ({ ...prevData, match: selectedMatch, matchId: selectedMatch.matchId }));
        } else {
            console.error("Selected match not found");
        }
    }

    return (
        <Dialog header={selectedTicket ? 'Update Ticket' : 'Create Ticket'} visible={visible} style={{ width: '450px' }} modal className="p-fluid" onHide={onHide}>
            <div className="p-field mb-4">
                <label htmlFor="quantity" className='block text-gray-700'>Quantity</label>
                <input id="quantity" name="quantity" type="number" value={ticketData.quantity} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required min={1} max={4} />
            </div>
            <div className="p-field mb-4">
                <label htmlFor="client" className='block text-gray-700'>Client</label>
                <select id="client" name="client" value={ticketData.client?.clientId} onChange={(e) => handleClientChange(Number(e.target.value))} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required >
                    <option value="">Select Client</option>
                    {clients.map(client => <option key={client.clientId} value={client.clientId}>{client.firstName} {client.lastName}</option>)}
                </select>
            </div>
            <div className="p-field mb-4">
                <label htmlFor="match" className='block text-gray-700'>Match</label>
                <select id="match" name="match" value={ticketData.match?.matchId} onChange={(e) => handleMatchChange(Number(e.target.value))} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required >
                    <option value="">Select Match</option>
                    {matches.map(match => <option key={match.matchId} value={match.matchId}>{match.name} </option>)}
                </select>
            </div>
            <div className="p-field mb-4">
                <label htmlFor="totalPrice" className='hidden text-gray-700'>Total Price</label>
                <input id="totalPrice" name="totalPrice" type="hidden" value={0} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div className="p-field flex justify-center items-center mt-4 mb-4">
                <Button label="Save" onClick={handleSaveTicket} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 w-20" />
                <Button label="Cancel"  onClick={onHide} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  w-24" />
            </div>
        </Dialog>
    );
}

export default DialogTicketForm;