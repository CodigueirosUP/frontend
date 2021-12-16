import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import Routers from './routers';
import { AuthProvider } from './context/AuthContext'
import { ManagerProvider } from './context/ManagerContext'
import { ServiceProvider } from './context/ServiceContext';
import { DashboardProvider } from './context/DashboardContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <ManagerProvider>
          <ServiceProvider>
            <Routers />
          </ServiceProvider>
        </ManagerProvider>
      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
