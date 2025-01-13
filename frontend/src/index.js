import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import RouterCustom from './router';
import { HashRouter } from 'react-router-dom';

import './styles/style.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(
    <BrowserRouter>
    <RouterCustom />
    </BrowserRouter>
    // <HashRouter>
    //     <RouterCustom />
    // </HashRouter>
);
// root.render(
//     // <ProfilePage></ProfilePage>
//     // <PersonalInfomationPage></PersonalInfomationPage>
//     <ChangePasswordPage></ChangePasswordPage>
// )