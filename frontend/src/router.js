import { Routes , Route, Navigate } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/HomePage"
import ProfilePage from "./pages/user/profilePage/ProfilePage";
import ProjectDetails from "./pages/user/Projects/projectDetails";
import RegisterPage from "./pages/admin/register";
import LoginPage from "./pages/admin/login"; 
import ChangePasswordPage from "./pages/user/ChangePassword/ChangePasswordPage";
import SettingUserPage from "./pages/user/Personal/SettingUserPage";
import ProjectBasePage from "./pages/user/Projects/projectBase/projectBasePage";
<<<<<<< HEAD
import TaskBoard from "./pages/user/TaskBoard/TaskBoard";
import PeopleList from "./pages/user/PeopleList/PeopleList";
=======
import ForgotPasswordPage from "./pages/admin/forgotPasswordPage";


>>>>>>> fe80559b37b486a0460f25213517490fb7aa7e01
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
        <Route path={ROUTERS.USER.DEFAULT} element={<Navigate to={ROUTERS.USER.LOGIN}/>}/>
        <Route path={ROUTERS.USER.HOME} element={<HomePage />} />
        <Route path={ROUTERS.USER.PROJECT.BASE} element={<ProjectBasePage />} /> 
        <Route path={ROUTERS.USER.PROJECT.PROJECTDETAILS} element={<ProjectDetails />} />
        <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTERS.USER.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTERS.USER.CHANGEPASSWORD} element={<ChangePasswordPage/>}/>
        <Route path={ROUTERS.USER.SETTINGUSER} element={<SettingUserPage/>}/>
<<<<<<< HEAD
        <Route path={ROUTERS.USER.MYTASK} element={<TaskBoard/>}/>
        <Route path={ROUTERS.USER.PEOPLELIST} element={<PeopleList/>}/>
=======
        <Route path={ROUTERS.USER.FORGOTPASSWORD} element={<ForgotPasswordPage/>}/>
>>>>>>> fe80559b37b486a0460f25213517490fb7aa7e01
      </Routes>
    );
  };

export default RouterCustom;