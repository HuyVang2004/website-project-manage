import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";

// User Pages
import HomePage from "./pages/user/HomePage"
import ProfilePage from "./pages/user/profilePage";



// Admin Pages
import RegisterPage from "./pages/admin/register";
import LoginPage from "./pages/admin/login";
import ForgotPassword from "./pages/auth/ForgotPassword" 
import AdminPage from "./pages/admin/AdminPage";
import LandingPage from "./pages/admin/LandingPage";
import UserManagement from "./pages/admin/UserManagement"; 
import UserDetails from "./pages/admin/UserDetails";
const RouterCustom = () => {
    return (
      <Routes>
        {/* User Routes */}
        <Route path={ROUTERS.USER.HOME} element={<HomePage />} />
        <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTERS.USER.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTERS.USER.FORGOTPASSWORD} element={<ForgotPassword />} />


        {/* Admin Routes */}
        <Route path={ROUTERS.ADMIN.DASHBOARD} element={<AdminPage />} />
        <Route path={ROUTERS.ADMIN.MANAGEMENT} element={<UserManagement />} />
        <Route path={ROUTERS.ADMIN.LANDINGPAGE} element={<LandingPage />} />
        <Route path={ROUTERS.ADMIN.USERDETAILS} element={<UserDetails />} />
        {/* You can add more specific admin routes here in the future */}
      </Routes>
    );
};

export default RouterCustom;