import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";

// User Pages
import HomePage from "./pages/user/HomePage"
import ProfilePage from "./pages/user/profilePage";



// Admin Pages
import RegisterPage from "./pages/admin/Register";
import LoginPage from "./pages/admin/Login";
import ForgotPassword from "./pages/auth/ForgotPassword" 
import AdminPage from "./pages/admin/AdminPage";
import LandingPage from "./pages/admin/LandingPage";
import UserManagement from "./pages/admin/UserManagement"; 
import UserDetails from "./pages/admin/UserDetails";
import Project from "./pages/admin/Project";
const RouterCustom = () => {
    return (
      <Routes>
        {/* User Routes */}
        <Route path={ROUTERS.USER.HOME} element={<HomePage />} />
        <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />} />
   


        {/* Admin Routes */}
        <Route path={ROUTERS.ADMIN.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTERS.ADMIN.LOGIN} element={<LoginPage />} />
        <Route path={ROUTERS.ADMIN.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTERS.ADMIN.DASHBOARD} element={<AdminPage />} />
        <Route path={ROUTERS.ADMIN.MANAGEMENT} element={<UserManagement />} />
        <Route path={ROUTERS.ADMIN.LANDINGPAGE} element={<LandingPage />} />
        <Route path={ROUTERS.ADMIN.USERDETAILS} element={<UserDetails />} />
        <Route path={ROUTERS.ADMIN.PROJECT} element={<Project />} />
        <Route path={ROUTERS.ADMIN.PROJECTDETAILS} element={<Project />} />
        {/* You can add more specific admin routes here in the future */}
      </Routes>
    );
};

export default RouterCustom;