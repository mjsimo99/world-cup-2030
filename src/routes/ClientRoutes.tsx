import React from 'react';
import { Route, Routes } from 'react-router-dom';

import withGuard from '../guards/withGuard';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Footer from '../components/Footer';
import Test from '../pages/test';
import CityComponent from '../components/CityComponent/CityComponent';
import StadiumComponent from '../components/StadiumComponent/StadiumComponent';


const CityComponentWithGuard = withGuard(CityComponent);
const StadiumComponentWithGuard = withGuard(StadiumComponent);
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
                <Route path="*" element={<ErrorPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default ClientRoutes;