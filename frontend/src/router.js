import { Routes , Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/HomePage"
import ProfilePage from "./pages/user/profilePage/ProfilePage";
import RegisterPage from "./pages/admin/register";
import LoginPage from "./pages/admin/login"; 
import ChangePasswordPage from "./pages/user/ChangePassword/ChangePasswordPage";
import SettingUserPage from "./pages/user/Personal/SettingUserPage";
import ProjectPage from "./pages/user/Projects/ProjectPage";


const renderUserRouter = () => {
    const userRouter = [
      {
        path: ROUTERS.USER.HOME,
        component: <HomePage />,
      },
      {
        path: ROUTERS.USER.PROFILE,
        component: <ProfilePage />,
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
        <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTERS.USER.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTERS.USER.CHANGEPASSWORD} element={<ChangePasswordPage/>}/>
        <Route path={ROUTERS.USER.SETTINGUSER} element={<SettingUserPage/>}/>
        <Route path={ROUTERS.USER.PROJECT} element={<ProjectPage/>}/>
      </Routes>
    );
  };

export default RouterCustom;