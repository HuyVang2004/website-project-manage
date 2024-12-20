import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import RouterCustom from './router';
import './styles/style.scss';
import App from './test/App';
import ProfilePage from './pages/user/profilePage/ProfilePage';
import PersonalInfomationPage from './pages/user/Personal/SettingUserPage';
import ChangePasswordPage from './pages/user/ChangePassword/ChangePasswordPage';

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(
    <BrowserRouter>
    <RouterCustom />
    </BrowserRouter>
);
// root.render(
//     // <ProfilePage></ProfilePage>
//     // <PersonalInfomationPage></PersonalInfomationPage>
//     <ChangePasswordPage></ChangePasswordPage>
// )