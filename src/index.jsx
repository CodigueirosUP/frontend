import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import Routers from './routers';
import { AuthProvider } from './context/AuthContext'
import { ManagerProvider } from './context/ManagerContext'
import { ServiceProvider } from './context/ServiceContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
        <ManagerProvider>
          <ServiceProvider>
            <Routers />
          </ServiceProvider>
        </ManagerProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
