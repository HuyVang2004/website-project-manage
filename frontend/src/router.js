import { Routes , Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/HomePage"
import ProfilePage from "./pages/user/profilePage/ProfilePage";
import ProjectDetails from "./pages/user/profilePage/projectDetails";
import RegisterPage from "./pages/admin/register";
import LoginPage from "./pages/admin/login"; 
import ChangePasswordPage from "./pages/user/ChangePassword/ChangePasswordPage";
import SettingUserPage from "./pages/user/Personal/SettingUserPage";
import ProjectPage from "./pages/user/Projects/ProjectPage";



// Admin Pages
import ForgotPassword from "./pages/auth/ForgotPassword" 
import AdminPage from "./pages/admin/AdminPage";
import LandingPage from "./pages/admin/LandingPage";
import UserManagement from "./pages/admin/UserManagement"; 
import UserDetails from "./pages/admin/UserDetails";
import Project from "./pages/admin/Project";
import UserAnalytics from "./pages/admin/Statistics.js";
import SystemSettings from "./pages/admin/SystemSettings.js"

const renderUserRouter = () => {
    const userRouter = [
      {
        path: ROUTERS.USER.HOME,
        component: <HomePage />,   
      },
      {
        path: ROUTERS.USER.PROFILE.BASE,
        component: <ProfilePage />,
      },
      {
        path: ROUTERS.USER.PROFILE.PROJECTDEETAILS,
        component: <ProjectDetails />,
      },
    ];
  
    // Trả về các Route từ mảng userRouter
    return userRouter.map((route, index) => (
      <Route key={index} path={route.path} element={route.component} />
    ));
  };


  const RouterCustom = () => {
    return (
      <Routes>
        <Route path={ROUTERS.USER.HOME} element={<HomePage />} />
        {/* <Route path={ROUTERS.USER.PROJECT.BASE} element={<ProfilePage />} /> */}
        <Route path={ROUTERS.USER.PROJECT.PROJECTDETAILS} element={<ProjectDetails />} />
        <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTERS.USER.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTERS.USER.CHANGEPASSWORD} element={<ChangePasswordPage/>}/>
        <Route path={ROUTERS.USER.SETTINGUSER} element={<SettingUserPage/>}/>



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
        <Route path={ROUTERS.ADMIN.STATISTICS} element={<UserAnalytics />} />
        <Route path={ROUTERS.ADMIN.SETTINGS} element={<SystemSettings />} />
      </Routes>
    );
  };

export default RouterCustom;