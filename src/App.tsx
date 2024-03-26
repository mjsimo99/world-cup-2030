import React from 'react';
import { Provider, useSelector } from 'react-redux';
import LoginForm from './components/login/LoginForm';
import AppRouter from './routes/AppRouter';
import store from './redux/store';
import { RootState } from './redux/reducers/RootState';
import PrivateRoute from './routes/PrivateRoute';

const ProtectedRoutes = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? <AppRouter /> : <PrivateRoute  />;
};

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>

        <ProtectedRoutes />
      </Provider>
    </div>
  );
};

export default App;
