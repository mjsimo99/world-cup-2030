import React from 'react';
import { Route, Routes } from 'react-router-dom';

import withGuard from '../guards/withGuard';
import Navbar from '../components/client/navbar/Navbar';
import Home from '../components/client/home/Home';
import ErrorPage from '../components/errorPage/ErrorPage';
import Footer from '../components/client/footer/Footer';
import Test from '../components/client/ticket/test';
import CityComponent from '../components/client/CityComponent/CityComponent';
import StadiumComponent from '../components/client/StadiumComponent/StadiumComponent';
import WorldCupTicketReservation from '../components/client/reservation/WorldCupTicketReservation';
import MatchComponent from '../components/client/MatchComponent/MatchComponent';
import ClientTickets from '../components/client/ClientTickets/ClientTickets';
const CityComponentWithGuard = withGuard(CityComponent);
const StadiumComponentWithGuard = withGuard(StadiumComponent);
const WorldCupTicketReservationWithGuard = withGuard(WorldCupTicketReservation);
const MatchComponentWithGuard = withGuard(MatchComponent);
const ClientTicketsWithGuard = withGuard(ClientTickets);
const HomeWithGuard = withGuard(Home);
const TestWithGuard = withGuard(Test);

const ClientRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomeWithGuard allowedRoles={['ROLE_CLIENT']} />} />
                <Route path="/test" element={<TestWithGuard allowedRoles={['ROLE_CLIENT']} />} />
                <Route path="/cities" element={<CityComponentWithGuard allowedRoles={['ROLE_CLIENT']} />} />
                <Route path="/stadiums" element={<StadiumComponentWithGuard allowedRoles={['ROLE_CLIENT']} />} />
                <Route path="/reservation" element={<WorldCupTicketReservationWithGuard allowedRoles={['ROLE_CLIENT']} />} />
                <Route path="/matches" element={<MatchComponentWithGuard allowedRoles={['ROLE_CLIENT']} />} />
                <Route path="/tickets" element={<ClientTicketsWithGuard allowedRoles={['ROLE_CLIENT']} />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default ClientRoutes;