import { Routes , Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/HomePage"
import ProfilePage from "./pages/user/profilePage";
import RegisterPage from "./pages/admin/register";
import LoginPage from "./pages/admin/login"; 

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
      </Routes>
    );
  };

export default RouterCustom;