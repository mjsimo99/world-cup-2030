import React from 'react';
import { Route, Routes } from 'react-router-dom';

import withGuard from '../guards/withGuard';
import CityAdminComponent from '../components/admin/city/CityAdminComponent';
import StadiumAdminComponent from '../components/admin/stadium/StadiumAdminComponent';
import TeamAdminComponent from '../components/admin/team/TeamAdminComponent';
import ClientAdminComponent from '../components/admin/client/ClientAdminComponent';
import MatchAdminComponent from '../components/admin/match/MatchAdminComponent';
import TeamMatchAdminComponent from '../components/admin/teamMatch/Team-MatchAdminComponent';
import TicketAdminComponent from '../components/admin/ticket/TicketAdminComponent';
import ErrorPage from '../components/errorPage/ErrorPage';

const CityAdminComponentWithGuard = withGuard(CityAdminComponent);
const StadiumAdminComponentWithGuard = withGuard(StadiumAdminComponent);
const TeamAdminComponentWithGuard = withGuard(TeamAdminComponent);
const ClientAdminComponentWithGuard = withGuard(ClientAdminComponent);
const MatchAdminComponentWithGuard = withGuard(MatchAdminComponent);
const TeamMatchAdminComponentWithGuard = withGuard(TeamMatchAdminComponent);
const TicketAdminComponentWithGuard = withGuard(TicketAdminComponent);

const AdminRoutes = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<CityAdminComponentWithGuard allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/admincity" element={<CityAdminComponentWithGuard allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/adminstadium" element={<StadiumAdminComponentWithGuard  allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/adminteam" element={<TeamAdminComponentWithGuard allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/adminclient" element={<ClientAdminComponentWithGuard  allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/adminmatch" element={<MatchAdminComponentWithGuard  allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/adminteamMatch" element={<TeamMatchAdminComponentWithGuard allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/adminticket" element={<TicketAdminComponentWithGuard allowedRoles={['ROLE_ADMIN']} />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/error" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;